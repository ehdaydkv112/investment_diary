/* eslint-disable camelcase */
import prismaClient from '../models/prismaClient';
import queryObjBuilder from '../lib/queryBuilder';

class QueryObjBuilder {
  table: 'user_info' | 'mail_code' | 'investing_diary_title' | 'investing_diary_detail';

  constructor(table: 'user_info' | 'mail_code' | 'investing_diary_title' | 'investing_diary_detail') {
    this.table = table;
  }

  async select<T>(data: T) {
    const query = await queryObjBuilder.where(data);
    if (this.table === 'user_info') return prismaClient.user_info.findMany(query);
    if (this.table === 'mail_code') return prismaClient.mail_code.findMany(query);
    if (this.table === 'investing_diary_title') return prismaClient.investing_diary_title.findMany(query);
    if (this.table === 'investing_diary_detail') return prismaClient.investing_diary_detail.findMany(query);
    return [];
  }

  async insertOne<T>(data: T) {
    const query = await queryObjBuilder.dataOne(data);
    if (this.table === 'user_info') return prismaClient.user_info.create(query);
    if (this.table === 'mail_code') return prismaClient.mail_code.create(query);
    if (this.table === 'investing_diary_title') return prismaClient.investing_diary_title.create(query);
    if (this.table === 'investing_diary_detail') return prismaClient.investing_diary_detail.create(query);
    return true;
  }

  async insertMany(data: [{ [key: string]: any }]) {
    const query = await queryObjBuilder.dataMany(data);
    if (this.table === 'user_info') return prismaClient.user_info.createMany(query);
    if (this.table === 'mail_code') return prismaClient.mail_code.createMany(query);
    if (this.table === 'investing_diary_title') return prismaClient.investing_diary_title.createMany(query);
    if (this.table === 'investing_diary_detail') return prismaClient.investing_diary_detail.createMany(query);
    return true;
  }

  async delete<T>(data: T) {
    const query = await queryObjBuilder.where(data);
    if (this.table === 'user_info') return prismaClient.user_info.delete(query);
    if (this.table === 'mail_code') return prismaClient.mail_code.delete(query);
    if (this.table === 'investing_diary_title') return prismaClient.investing_diary_title.delete(query);
    if (this.table === 'investing_diary_detail') return prismaClient.investing_diary_detail.delete(query);
    return true;
  }

  async deleteMany<T>(data: T) {
    const query = await queryObjBuilder.where(data);
    if (this.table === 'user_info') return prismaClient.user_info.deleteMany(query);
    if (this.table === 'mail_code') return prismaClient.mail_code.deleteMany(query);
    if (this.table === 'investing_diary_title') return prismaClient.investing_diary_title.deleteMany(query);
    if (this.table === 'investing_diary_detail') return prismaClient.investing_diary_detail.deleteMany(query);
    return true;
  }
}

const database = {
  userInfo: new QueryObjBuilder('user_info'),
  mailCode: new QueryObjBuilder('mail_code'),
  investingDiaryTitle: new QueryObjBuilder('investing_diary_title'),
  investingDiaryDetail: new QueryObjBuilder('investing_diary_detail'),
};

export = database;
