-- MySQL dump 10.13  Distrib 8.1.0, for macos13 (arm64)
--
-- Host: localhost    Database: db_xxxx
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_ucenter_code`
--

DROP TABLE IF EXISTS `t_ucenter_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_code` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_code_type` varchar(10) NOT NULL COMMENT '验证码类型',
  `ucenter_code_mobile` varchar(200) NOT NULL COMMENT '验证码手机号',
  `ucenter_code_code` char(6) NOT NULL COMMENT '验证码',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_ucenter_menu`
--

DROP TABLE IF EXISTS `t_ucenter_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_menu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_menu_parent` int NOT NULL COMMENT '菜单父id',
  `ucenter_menu_sn` char(3) NOT NULL COMMENT '菜单序号',
  `ucenter_menu_title` varchar(200) NOT NULL COMMENT '菜单名称',
  `ucenter_menu_url` varchar(200) NOT NULL COMMENT '菜单地址',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ucenter_menu`
--

LOCK TABLES `t_ucenter_menu` WRITE;
/*!40000 ALTER TABLE `t_ucenter_menu` DISABLE KEYS */;
INSERT INTO `t_ucenter_menu` VALUES (1,0,'01','用户角色管理','#/ucenter/role','2023-08-29 19:17:00',1,'18612257325','2023-08-29 19:17:00',1,'18612257325','0'),(2,0,'01','用户菜单管理','#/ucenter/menu','2023-08-29 19:17:15',1,'18612257325','2023-08-29 19:17:15',1,'18612257325','0'),(3,0,'01','用户详情管理','#/ucenter/user','2023-08-29 19:17:26',1,'18612257325','2023-08-29 19:17:26',1,'18612257325','0'),(4,0,'01','角色菜单管理','#/ucenter/rolemenu','2023-08-29 19:17:42',1,'18612257325','2023-08-29 19:17:42',1,'18612257325','0'),(5,0,'01','角色用户管理','#/ucenter/roleuser','2023-08-29 19:17:56',1,'18612257325','2023-08-29 19:17:56',1,'18612257325','0');
/*!40000 ALTER TABLE `t_ucenter_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ucenter_role`
--

DROP TABLE IF EXISTS `t_ucenter_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_role_name` varchar(200) NOT NULL COMMENT '角色名称',
  `ucenter_role_url` varchar(200) NOT NULL COMMENT '角色跳转地址',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ucenter_role`
--

LOCK TABLES `t_ucenter_role` WRITE;
/*!40000 ALTER TABLE `t_ucenter_role` DISABLE KEYS */;
INSERT INTO `t_ucenter_role` VALUES (1,'超级管理员','1','2023-08-29 19:12:30',1,'18612257325','2023-08-29 19:12:30',1,'18612257325','0');
/*!40000 ALTER TABLE `t_ucenter_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ucenter_rolemenu`
--

DROP TABLE IF EXISTS `t_ucenter_rolemenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_rolemenu` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_role_id` int NOT NULL COMMENT '角色id',
  `ucenter_menu_id` int NOT NULL COMMENT '菜单id',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ucenter_rolemenu`
--

LOCK TABLES `t_ucenter_rolemenu` WRITE;
/*!40000 ALTER TABLE `t_ucenter_rolemenu` DISABLE KEYS */;
INSERT INTO `t_ucenter_rolemenu` VALUES (1,1,1,'2023-08-29 19:18:59',1,'18612257325','2023-08-29 19:18:59',1,'18612257325','0'),(2,1,2,'2023-08-29 19:19:02',1,'18612257325','2023-08-29 19:19:02',1,'18612257325','0'),(3,1,3,'2023-08-29 19:19:04',1,'18612257325','2023-08-29 19:19:04',1,'18612257325','0'),(4,1,4,'2023-08-29 19:19:06',1,'18612257325','2023-08-29 19:19:06',1,'18612257325','0'),(5,1,5,'2023-08-29 19:19:09',1,'18612257325','2023-08-29 19:19:09',1,'18612257325','0');
/*!40000 ALTER TABLE `t_ucenter_rolemenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ucenter_roleuser`
--

DROP TABLE IF EXISTS `t_ucenter_roleuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_roleuser` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_role_id` int NOT NULL COMMENT '角色id',
  `ucenter_user_id` int NOT NULL COMMENT '用户id',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ucenter_roleuser`
--

LOCK TABLES `t_ucenter_roleuser` WRITE;
/*!40000 ALTER TABLE `t_ucenter_roleuser` DISABLE KEYS */;
INSERT INTO `t_ucenter_roleuser` VALUES (1,1,1,'2023-08-29 19:18:45',1,'18612257325','2023-08-29 19:18:45',1,'18612257325','0');
/*!40000 ALTER TABLE `t_ucenter_roleuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_ucenter_user`
--

DROP TABLE IF EXISTS `t_ucenter_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_ucenter_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_user_name` varchar(200) NOT NULL COMMENT '用户名',
  `ucenter_user_password` varchar(200) NOT NULL COMMENT '用户密码',
  `cdate` datetime NOT NULL COMMENT '创建时间',
  `cuser_id` int NOT NULL COMMENT '创建人id',
  `cuser_name` varchar(200) NOT NULL COMMENT '创建人姓名',
  `udate` datetime NOT NULL COMMENT '更新时间',
  `uuser_id` int NOT NULL COMMENT '更新人id',
  `uuser_name` varchar(200) NOT NULL COMMENT '更新人姓名',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-29 19:33:40
