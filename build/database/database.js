"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable camelcase */
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const queryBuilder_1 = __importDefault(require("../lib/queryBuilder"));
class QueryObjBuilder {
    table;
    constructor(table) {
        this.table = table;
    }
    async select(data) {
        const query = await queryBuilder_1.default.where(data);
        if (this.table === 'user_info')
            return prismaClient_1.default.user_info.findMany(query);
        if (this.table === 'mail_code')
            return prismaClient_1.default.mail_code.findMany(query);
        if (this.table === 'investing_diary_title')
            return prismaClient_1.default.investing_diary_title.findMany(query);
        if (this.table === 'investing_diary_detail')
            return prismaClient_1.default.investing_diary_detail.findMany(query);
        return [];
    }
    async insertOne(data) {
        const query = await queryBuilder_1.default.dataOne(data);
        if (this.table === 'user_info')
            return prismaClient_1.default.user_info.create(query);
        if (this.table === 'mail_code')
            return prismaClient_1.default.mail_code.create(query);
        if (this.table === 'investing_diary_title')
            return prismaClient_1.default.investing_diary_title.create(query);
        if (this.table === 'investing_diary_detail')
            return prismaClient_1.default.investing_diary_detail.create(query);
        return true;
    }
    async insertMany(data) {
        const query = await queryBuilder_1.default.dataMany(data);
        if (this.table === 'user_info')
            return prismaClient_1.default.user_info.createMany(query);
        if (this.table === 'mail_code')
            return prismaClient_1.default.mail_code.createMany(query);
        if (this.table === 'investing_diary_title')
            return prismaClient_1.default.investing_diary_title.createMany(query);
        if (this.table === 'investing_diary_detail')
            return prismaClient_1.default.investing_diary_detail.createMany(query);
        return true;
    }
    async delete(data) {
        const query = await queryBuilder_1.default.where(data);
        if (this.table === 'user_info')
            return prismaClient_1.default.user_info.delete(query);
        if (this.table === 'mail_code')
            return prismaClient_1.default.mail_code.delete(query);
        if (this.table === 'investing_diary_title')
            return prismaClient_1.default.investing_diary_title.delete(query);
        if (this.table === 'investing_diary_detail')
            return prismaClient_1.default.investing_diary_detail.delete(query);
        return true;
    }
    async deleteMany(data) {
        const query = await queryBuilder_1.default.where(data);
        if (this.table === 'user_info')
            return prismaClient_1.default.user_info.deleteMany(query);
        if (this.table === 'mail_code')
            return prismaClient_1.default.mail_code.deleteMany(query);
        if (this.table === 'investing_diary_title')
            return prismaClient_1.default.investing_diary_title.deleteMany(query);
        if (this.table === 'investing_diary_detail')
            return prismaClient_1.default.investing_diary_detail.deleteMany(query);
        return true;
    }
}
const database = {
    userInfo: new QueryObjBuilder('user_info'),
    mailCode: new QueryObjBuilder('mail_code'),
    investingDiaryTitle: new QueryObjBuilder('investing_diary_title'),
    investingDiaryDetail: new QueryObjBuilder('investing_diary_detail'),
};
module.exports = database;
