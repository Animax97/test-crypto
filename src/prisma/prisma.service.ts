import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

Injectable();
/**
 * PrismaService class extends PrismaClient and implements OnModuleInit.
 * This service is responsible for initializing the Prisma client and
 * establishing a connection to the database when the module is initialized.
 */
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}