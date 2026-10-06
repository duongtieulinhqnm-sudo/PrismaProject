#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a270b6c71a5e4fdbedf7d534d643f233955a09f9b2d924b58bba624dbdf911eb/contract';
import endContract from '../../snapshots/a270b6c71a5e4fdbedf7d534d643f233955a09f9b2d924b58bba624dbdf911eb/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e00d0b31f42392206b9dc244f630fe8ff1083511f235ce185eccee5ad37c6165/contract';
import startContract from '../../snapshots/e00d0b31f42392206b9dc244f630fe8ff1083511f235ce185eccee5ad37c6165/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'accountMetric',
        columns: [
          col('accountId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('followers', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('following', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('likes', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('recordedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('videoCount', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'crawlError',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('errorCode', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('errorMessage', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('jobId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('requestUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('retryCount', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('statusCode', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'crawlError_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'crawlJob',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('errorMessage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('finishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('itemsFailed', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('itemsFound', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('itemsSaved', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('startedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('targetType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('targetValue', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'crawlJob_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
          checkExpression(
            'crawlJob_status_check_e31902a8',
            "\"status\" IN ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'hashtag',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'hashtag_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'media',
        columns: [
          col('bucket', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('duration', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('fileSize', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('height', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('mediaType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('mimeType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('objectKey', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('postId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sha256', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('storageProvider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('width', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'postHashtag',
        columns: [
          col('hashtagId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('postId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['postId', 'hashtagId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'postSound',
        columns: [
          col('postId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('soundId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['postId', 'soundId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rawObject',
        columns: [
          col('bucket', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('contentType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('fetchedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('fileSize', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('objectKey', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('objectType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sha256', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('sourceId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'rawObject_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'socialAccount',
        columns: [
          col('avatarUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('bio', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('displayName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isVerified', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platformUserId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'socialAccount_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'socialComment',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('likeCount', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('parentCommentId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platformCommentId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('postId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('publishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('replyCount', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('text', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'socialComment_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'socialPost',
        columns: [
          col('accountId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('caption', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('duration', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('language', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('mediaUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('permalink', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platformPostId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('postType', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('publishedAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
          col('thumbnailUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'socialPost_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'socialPostMetric',
        columns: [
          col('comments', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('favorites', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('likes', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('postId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('recordedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('shares', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('views', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'sound',
        columns: [
          col('artist', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('duration', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('platform', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('platformSoundId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'sound_platform_check_87376b54',
            "\"platform\" IN ('TIKTOK', 'INSTAGRAM')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'hashtag',
        constraint: 'hashtag_platform_name_key',
        columns: ['platform', 'name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'media',
        constraint: 'media_storageProvider_bucket_objectKey_key',
        columns: ['storageProvider', 'bucket', 'objectKey'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'socialAccount',
        constraint: 'socialAccount_platform_platformUserId_key',
        columns: ['platform', 'platformUserId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'socialComment',
        constraint: 'socialComment_platform_platformCommentId_key',
        columns: ['platform', 'platformCommentId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'socialPost',
        constraint: 'socialPost_platform_platformPostId_key',
        columns: ['platform', 'platformPostId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'sound',
        constraint: 'sound_platform_platformSoundId_key',
        columns: ['platform', 'platformSoundId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'accountMetric',
        index: 'accountMetric_accountId_idx_cbfb3085',
        columns: ['accountId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'accountMetric',
        index: 'accountMetric_accountId_recordedAt_idx_1e1a8356',
        columns: ['accountId', 'recordedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'crawlError',
        index: 'crawlError_jobId_idx_623c8f77',
        columns: ['jobId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'crawlJob',
        index: 'crawlJob_platform_status_idx_ef2b8345',
        columns: ['platform', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'media',
        index: 'media_postId_idx_a7a72715',
        columns: ['postId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'postHashtag',
        index: 'postHashtag_hashtagId_idx_d1269a37',
        columns: ['hashtagId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'postHashtag',
        index: 'postHashtag_postId_idx_a7a72715',
        columns: ['postId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'postSound',
        index: 'postSound_postId_idx_a7a72715',
        columns: ['postId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'postSound',
        index: 'postSound_soundId_idx_a12d06a7',
        columns: ['soundId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rawObject',
        index: 'rawObject_platform_objectType_idx_152e4009',
        columns: ['platform', 'objectType'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rawObject',
        index: 'rawObject_sourceId_idx_d92a2571',
        columns: ['sourceId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialAccount',
        index: 'socialAccount_platform_username_idx_16403622',
        columns: ['platform', 'username'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialComment',
        index: 'socialComment_postId_idx_a7a72715',
        columns: ['postId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialComment',
        index: 'socialComment_postId_publishedAt_idx_282997c6',
        columns: ['postId', 'publishedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPost',
        index: 'socialPost_accountId_idx_cbfb3085',
        columns: ['accountId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPost',
        index: 'socialPost_accountId_publishedAt_idx_47d344f9',
        columns: ['accountId', 'publishedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPost',
        index: 'socialPost_platform_publishedAt_idx_182a8f8e',
        columns: ['platform', 'publishedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPostMetric',
        index: 'socialPostMetric_postId_idx_a7a72715',
        columns: ['postId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPostMetric',
        index: 'socialPostMetric_postId_recordedAt_idx_6a3131d7',
        columns: ['postId', 'recordedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'socialPostMetric',
        index: 'socialPostMetric_recordedAt_idx_fd5b4732',
        columns: ['recordedAt'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'accountMetric',
        foreignKey: {
          name: 'accountMetric_accountId_fkey',
          columns: ['accountId'],
          references: { schema: 'public', table: 'socialAccount', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'media',
        foreignKey: {
          name: 'media_postId_fkey',
          columns: ['postId'],
          references: { schema: 'public', table: 'socialPost', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'postHashtag',
        foreignKey: {
          name: 'postHashtag_postId_fkey',
          columns: ['postId'],
          references: { schema: 'public', table: 'socialPost', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'postHashtag',
        foreignKey: {
          name: 'postHashtag_hashtagId_fkey',
          columns: ['hashtagId'],
          references: { schema: 'public', table: 'hashtag', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'postSound',
        foreignKey: {
          name: 'postSound_postId_fkey',
          columns: ['postId'],
          references: { schema: 'public', table: 'socialPost', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'postSound',
        foreignKey: {
          name: 'postSound_soundId_fkey',
          columns: ['soundId'],
          references: { schema: 'public', table: 'sound', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'socialComment',
        foreignKey: {
          name: 'socialComment_postId_fkey',
          columns: ['postId'],
          references: { schema: 'public', table: 'socialPost', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'socialPost',
        foreignKey: {
          name: 'socialPost_accountId_fkey',
          columns: ['accountId'],
          references: { schema: 'public', table: 'socialAccount', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'socialPostMetric',
        foreignKey: {
          name: 'socialPostMetric_postId_fkey',
          columns: ['postId'],
          references: { schema: 'public', table: 'socialPost', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
