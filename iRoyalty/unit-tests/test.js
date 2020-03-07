//unit testing for socket functions
//tests strings and json
/*jslint node: true */
"use strict";

const expect = require("chai").expect;
const io = require("socket.io-client");
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