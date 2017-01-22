/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : nodejsBackstage

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 01/22/2017 21:51:10 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `rdm_catalogues`
-- ----------------------------
DROP TABLE IF EXISTS `rdm_catalogues`;
CREATE TABLE `rdm_catalogues` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`F_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_start` int(8) DEFAULT NULL,
	`F_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_sort` int(8) DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	`F_parent` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_AllowDelete` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=44 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `rdm_catalogues`
-- ----------------------------
BEGIN;
INSERT INTO `rdm_catalogues` VALUES ('35', '0002', '目录管理', 'line-chart', '1', '1', '1', '2016-12-25 07:08:23', '2017-01-20 13:45:03', '1', 'catalogue', '1'), ('37', '0003', '组织结构', 'bed', '0', '', '2', '2017-01-20 13:45:40', '2017-01-20 13:45:40', '1', 'organize', '1'), ('38', '0004', '用户管理', 'bed', '0', '', '3', '2017-01-20 13:46:10', '2017-01-20 13:46:10', '1', 'users', '1'), ('39', '0005', '角色管理', 'bed', '0', '', '4', '2017-01-20 13:46:43', '2017-01-20 13:46:58', '1', 'role', '1'), ('40', '0006', '报表管理', 'bed', '0', '', '5', '2017-01-20 13:47:34', '2017-01-20 13:49:50', '1', 'reportRoutes', '1'), ('41', '0007', '', '', '0', '', '6', '2017-01-20 15:48:00', '2017-01-20 15:48:00', '', '', '1'), ('42', '0008', '', '', '0', '', '7', '2017-01-20 15:48:17', '2017-01-20 15:48:17', '', '', '1'), ('43', '0009', '', '', '0', '', '8', '2017-01-20 15:52:40', '2017-01-20 15:52:40', '', '', '1');
COMMIT;

-- ----------------------------
--  Table structure for `rdm_organizes`
-- ----------------------------
DROP TABLE IF EXISTS `rdm_organizes`;
CREATE TABLE `rdm_organizes` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`f_ParentId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`f_Layers` int(11) DEFAULT NULL,
	`f_EnCode` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`f_FullName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_ManagerName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_MobilePhone` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_AllowEdit` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_AllowDelete` int(11) DEFAULT NULL,
	`F_DeleteMark` int(11) DEFAULT NULL,
	`F_EnabledMark` int(11) DEFAULT NULL,
	`F_DeleteUserId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_Remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=21 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `rdm_organizes`
-- ----------------------------
BEGIN;
INSERT INTO `rdm_organizes` VALUES ('4', '', '1', '0001', '管理部门', '老王大大', '13857476603', 'wjszxli@163.com', '1', '1', '0', '1', null, '这个不允许删除哟', '2017-01-08 09:11:32', '2017-01-08 15:15:25'), ('8', '', '1', '0002', '测试部门', '老大', '13857476603', 'wjszxli@163.com', '1', '1', '0', '1', null, '500', '2017-01-08 14:28:04', '2017-01-08 14:28:04'), ('9', '', '1', '0003', '研发部门', '老王', '13857476603', 'wjszxli@163.com', '1', '1', '0', '1', null, '', '2017-01-08 14:40:20', '2017-01-08 14:40:20'), ('10', '', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', null, '', '2017-01-08 14:41:20', '2017-01-08 14:41:20'), ('11', '', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', null, '', '2017-01-08 14:41:25', '2017-01-08 14:41:25'), ('12', '', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', null, '', '2017-01-08 14:41:31', '2017-01-08 14:41:31'), ('13', '', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1', null, '', '2017-01-08 14:41:37', '2017-01-08 14:41:37'), ('14', '', '1', '2', '2', '2', '2', '2', '1', '1', '0', '1', null, '', '2017-01-08 14:41:43', '2017-01-08 14:41:43'), ('15', '', '1', '3', '3', '3', '3', '3', '1', '1', '0', '1', null, '', '2017-01-08 14:41:49', '2017-01-08 14:41:49'), ('16', '', '1', '4', '4', '4', '4', '4', '1', '1', '0', '1', null, '', '2017-01-08 14:41:57', '2017-01-08 14:41:57'), ('17', '', '1', '5', '5', '5', '5', '5', '1', '1', '0', '1', null, '', '2017-01-08 14:42:04', '2017-01-08 14:42:04'), ('18', '', '1', '', '', '', '', '', '1', '1', '0', '1', null, '这是管理员权限，不允许删除。', '2017-01-08 15:16:53', '2017-01-08 15:16:53'), ('19', '', '1', '', '', '', '', '', '1', '1', '0', '1', null, '测试测试', '2017-01-08 15:20:05', '2017-01-08 15:20:05'), ('20', '', '1', '', '', '', '', '', '1', '1', '0', '1', null, '3', '2017-01-08 15:22:13', '2017-01-08 15:22:13');
COMMIT;

-- ----------------------------
--  Table structure for `rdm_reports`
-- ----------------------------
DROP TABLE IF EXISTS `rdm_reports`;
CREATE TABLE `rdm_reports` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`reportId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`formType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportStatistics` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportStatisticsType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportSecond` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportEnd` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`reportSort` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=2 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `rdm_reports`
-- ----------------------------
BEGIN;
INSERT INTO `rdm_reports` VALUES ('1', '12', '1', '12', '12', '', '12', '12', '12', '2016-12-25 05:45:41', '2016-12-25 05:45:41');
COMMIT;

-- ----------------------------
--  Table structure for `rdm_roles`
-- ----------------------------
DROP TABLE IF EXISTS `rdm_roles`;
CREATE TABLE `rdm_roles` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`F_RoleId` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_RoleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`F_Sort` int(11) DEFAULT NULL,
	`F_Remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=3 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `rdm_roles`
-- ----------------------------
BEGIN;
INSERT INTO `rdm_roles` VALUES ('1', '0001', '管理员权限', '1', '这是管理员权限。', '2017-01-08 15:27:19', '2017-01-08 15:27:19'), ('2', '0002', '测试员权限', '2', '测试测试', '2017-01-08 15:30:34', '2017-01-08 15:30:34');
COMMIT;

-- ----------------------------
--  Table structure for `rdm_users`
-- ----------------------------
DROP TABLE IF EXISTS `rdm_users`;
CREATE TABLE `rdm_users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`user_account` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_realname` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_dept_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_duty_id` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_role_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_enable` bigint(20) DEFAULT NULL,
	`user_gender` bigint(20) DEFAULT NULL,
	`user_phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_birthday` datetime DEFAULT NULL,
	`user_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`user_remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	`F_Sort` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=`InnoDB` AUTO_INCREMENT=25 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;

-- ----------------------------
--  Records of `rdm_users`
-- ----------------------------
BEGIN;
INSERT INTO `rdm_users` VALUES ('6', '234', '34', '234', '0', '1', '0', '0', '0', '234', '2016-09-03 00:00:00', '23', '23324', '2016-12-27 15:24:46', '2016-12-27 15:24:46', '1'), ('7', '234', '34', '234', '0', '1', '0', '0', '0', '234', '2016-09-03 00:00:00', '23', '23324', '2016-12-27 15:26:35', '2016-12-27 15:26:35', '2'), ('8', '234', '34', '234', '0', '1', '0', '0', '0', '234', '2016-09-03 00:00:00', '23', '23324', '2016-12-27 15:32:19', '2016-12-27 15:32:19', '3'), ('12', 'wjszxli123', '老王大大123', '123456', '0', '0', '1', '1', '1', '138574766030', '2016-04-01 16:00:00', 'wjszxli@163.com', '老王大大', '2016-12-29 14:33:33', '2017-01-05 15:10:13', '4'), ('13', 'lt', '刘涛', '111111', '0', '1', '0', '1', '0', '13857476603', '2017-01-27 00:00:00', 'wjszxli@163.com', '3455', '2017-01-04 14:29:24', '2017-01-04 14:29:24', '5'), ('14', 'zk', '钟馗', '111111', '1', '0', '0', '1', '0', '13857476603', '2017-01-27 00:00:00', 'wjszxli@163.com', '2017-01-27', '2017-01-04 14:30:02', '2017-01-04 14:30:02', '6'), ('15', 'wjs', '用户', '111111', '0', '1', '1', '1', '0', '13857476603', '2017-01-27 00:00:00', 'wjszxli@163.com', '435345', '2017-01-04 14:30:40', '2017-01-04 14:30:40', '7'), ('16', '111', '1111', '111', '0', '0', '1', '1', '0', '13857476603', '2017-01-27 00:00:00', 'werqwe', 'qwerqw', '2017-01-04 14:31:15', '2017-01-04 14:31:15', '8'), ('17', 'adf', 'asdf', 'asdf', '1', '1', '1', '1', '0', '13857476603', '2017-01-27 00:00:00', 'ewrt', 'wert', '2017-01-04 14:31:37', '2017-01-04 14:31:37', '9'), ('18', 'sfg', 'fgs', 'sfg', '1', '1', '0', '1', '0', '324234', '2017-01-27 00:00:00', '2017-01-27', '2017-01-27', '2017-01-04 14:31:52', '2017-01-04 14:31:52', '10'), ('19', '234', '34', '234', '0', '1', '0', '0', '0', '234', '2016-08-05 16:00:00', '23', '23324', '2017-01-05 14:38:38', '2017-01-05 14:38:38', '11'), ('20', 'wjszxli', '老王大大', '123456', '0', '0', '1', '1', '0', '138574766030', '2016-07-03 16:00:00', 'wjszxli@163.com', '老王大大', '2017-01-05 14:38:45', '2017-01-05 14:38:45', '12'), ('21', '234', '34', '234', '1', '1', '1', '1', '0', '234', '2016-07-30 00:00:00', '234', 'w345', '2017-01-05 14:56:21', '2017-01-05 14:56:21', '13'), ('24', 'admin', '管理员', '123456', '1', '1', '1', '1', '0', '13857476603', '2016-08-09 00:00:00', 'wjzxli@163.com', '这是备注', '2017-01-05 15:22:48', '2017-01-05 15:22:48', '14');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
