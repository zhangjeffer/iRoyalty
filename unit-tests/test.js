//unit testing for socket functions
//tests strings and json
"use strict"
const URI = "mongodb+srv://cluster0-sz1zy.mongodb.net/test?retryWrites=true&w=majority";
=======
/*jslint node: true */
const expect = require("chai").expect;
const io = require("socket.io-client");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ioSettings = {
    transports: ["websocket"],
    forceNew: true,
    reconnection: false
    };
const stringTest = "testtesttest";
const jsonTest = {
    message: "testtesttest"
    };
var server;
var emitterZ;
var listenerZ;

const tSchema = new Schema({
    userId: {type: String, required: true}
});

const tUserId = mongoose.model("userId", tSchema);

describe("Mongodb Tests",function(){
    before(function (done){
        mongoose.connect(URI,{
            dbName: "unitTests",
            user: "Group69",
            pass: "Group69!",
            userNewUrlParser: true,
            useUnifiedTopology: true
        }, function(error){
            if(error){
                console.log(error);
            }else{
                console.log("Connected to the db");
            }
        });
        const db = mongoose.connection;
        db.once("open",function(){
            done();
        });
    });
    describe("Test Mongodb",function(){
        it("Adding userID to db",function(done){
            var testVal = tUserId({
                userId: "test"
            });
            testVal.save(done);
        });
        it("adding incorrect format to db", function(done){
            var wrongFormat = tUserId({
                wrong: "test"
            })
            wrongFormat.save(err => {
                if(err){
                    return done();
                }
            });
        });
        it("removing existing userID from db",function(done){
            var testVal = tUserId({
                userId: "test"
            });
            testVal.save();
            testVal.remove(done);
        });
        it("removing non existent userID from db",function(done){
            var testVal = tUserId({
                userId: "test"
            });
            testVal.remove(done);
        });

    });

});

describe("Socket Functions", function(){
    this.timeout(10000);
    
    beforeEach(function(done){
        server = require("../app");
        emitterZ = io.connect("http://localhost:5000/", ioSettings);
        listenerZ = io.connect("http://localhost:5000/", ioSettings);
        done();
    });
    afterEach(function(done){
        emitterZ.disconnect();
        listenerZ.disconnect();
        done();
    });

    describe("JSON Transfer EMIT", function(){
        it ("move piece emit",function(done){
            emitterZ.emit("move piece", jsonTest);
            expect(jsonTest).to.equal(jsonTest);
            done();
        });
    });
    describe("JSON Transfer Listen", function(){
        it ("move piece on",function(done){
            listenerZ.on("move piece", jsonTest);
            expect(jsonTest).to.equal(jsonTest);
            done();
        });
    });
    describe("String Transfer EMIT", function(){
        it ("find opponent testing",function(done){
            emitterZ.emit("find_opponent", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
        it ("establish pairing testing",function(done){
            emitterZ.emit("establish_pairing", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
        it ("send reject testing",function(done){
            emitterZ.emit("sendreject", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
    });
    describe("String Transfer Listen", function(){
        it ("challenger testing",function(done){
            listenerZ.on("challenger", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
        it ("start game testing.",function(done){
            emitterZ.emit("startgame", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
        it ("reject testing",function(done){
            listenerZ.on("reject", stringTest);
            expect(stringTest).to.equal(stringTest);
            done();
        });
    });
});
