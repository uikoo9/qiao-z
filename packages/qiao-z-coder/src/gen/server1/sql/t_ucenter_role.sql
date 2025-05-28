--
-- Table structure for table `t_ucenter_role`
--

DROP TABLE IF EXISTS `t_ucenter_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_ucenter_role` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ucenter_role_name` varchar(200) NOT NULL COMMENT '角色名称',
  `ucenter_role_url` varchar(200) NOT NULL COMMENT '角色跳转地址',
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `del_tag` char(1) NOT NULL COMMENT '是否删除，0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ucenter_role`
--

LOCK TABLES `t_ucenter_role` WRITE;
/*!40000 ALTER TABLE `t_ucenter_role` DISABLE KEYS */;
INSERT INTO `t_ucenter_role` VALUES (3,'超级管理员','/login','2019-03-06 19:47:24',1,'admin','2019-03-07 18:15:51',1,'admin','0'),(4,'官网运维','/login','2019-03-07 16:44:52',1,'admin','2019-03-07 17:54:12',1,'admin','1'),(5,'管理员','/login','2019-03-07 18:20:16',1,'admin','2019-03-07 18:20:16',1,'admin','0'),(6,'官网运维','/login','2019-03-07 18:30:04',1,'admin','2019-03-07 18:30:04',1,'admin','0');
/*!40000 ALTER TABLE `t_ucenter_role` ENABLE KEYS */;
UNLOCK TABLES;