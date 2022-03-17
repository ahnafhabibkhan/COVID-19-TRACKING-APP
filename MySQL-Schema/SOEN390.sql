-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: soen390
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accountrequest`
--

DROP TABLE IF EXISTS `accountrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountrequest` (
  `Email` varchar(45) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Telephone` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  `Role` enum('Admin','Patient','Doctor','HealthOfficial','ImmigrationOfficer') NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `City` varchar(45) NOT NULL,
  `Country` varchar(45) NOT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountrequest`
--

LOCK TABLES `accountrequest` WRITE;
/*!40000 ALTER TABLE `accountrequest` DISABLE KEYS */;
INSERT INTO `accountrequest` VALUES ('benoit@gmail.com','Benoit','Jean','5487582026','49857 Low','HealthOfficial','password','2022-02-14','15:22:00','Brossard','Canada');
/*!40000 ALTER TABLE `accountrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `PID` int unsigned NOT NULL,
  `DID` int unsigned NOT NULL,
  `LevelOfEmergency` int NOT NULL,
  `Priority` int NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointmentrequest`
--

DROP TABLE IF EXISTS `appointmentrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointmentrequest` (
  `PID` int NOT NULL,
  `DID` int NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `RequestedBy` enum('P','D') NOT NULL,
  `LevelOfEmergency` int NOT NULL,
  `Priority` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointmentrequest`
--

LOCK TABLES `appointmentrequest` WRITE;
/*!40000 ALTER TABLE `appointmentrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointmentrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctoravailability`
--

DROP TABLE IF EXISTS `doctoravailability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctoravailability` (
  `DID` int NOT NULL,
  `DayOfWeek` enum('Monday','Tuesday','Wednesday','Thursday','Friday') DEFAULT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `SpecificDay` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctoravailability`
--

LOCK TABLES `doctoravailability` WRITE;
/*!40000 ALTER TABLE `doctoravailability` DISABLE KEYS */;
INSERT INTO `doctoravailability` VALUES (4,'Friday','09:00:00','10:00:00','2022-02-25'),(4,'Friday','15:00:00','16:00:00','2022-02-25');
/*!40000 ALTER TABLE `doctoravailability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `healthstatus`
--

DROP TABLE IF EXISTS `healthstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `healthstatus` (
  `PID` int unsigned NOT NULL,
  `fillOutDate` date NOT NULL,
  `lastUpdateTime` time NOT NULL,
  `Weight` decimal(5,2) unsigned NOT NULL,
  `SympDescription` varchar(100) NOT NULL,
  `Temperature` decimal(5,2) NOT NULL,
  `BreathingIssues` tinyint NOT NULL,
  `Cough` tinyint NOT NULL,
  `LostTasteSmell` tinyint NOT NULL,
  `MusclePain` tinyint NOT NULL,
  `Diarrhea` tinyint NOT NULL,
  `Vomitting` tinyint NOT NULL,
  `Nausea` tinyint NOT NULL,
  `Headache` tinyint NOT NULL,
  `SoreThroat` tinyint NOT NULL,
  `Covid` tinyint NOT NULL,
  PRIMARY KEY (`PID`,`fillOutDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `healthstatus`
--

LOCK TABLES `healthstatus` WRITE;
/*!40000 ALTER TABLE `healthstatus` DISABLE KEYS */;
INSERT INTO `healthstatus` VALUES (1,'2022-02-04','13:54:00',85.00,'None',35.00,0,0,0,0,0,0,0,1,0,0),(1,'2022-02-05','21:23:00',85.00,'None',37.00,0,1,0,1,1,0,1,1,1,1),(1,'2022-02-06','20:23:00',85.00,'None',37.00,0,1,0,1,1,0,1,0,1,1),(5,'2022-02-02','16:15:00',80.00,'None',35.00,0,0,0,0,0,0,0,0,0,1);
/*!40000 ALTER TABLE `healthstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `SendUserID` int NOT NULL,
  `ReceiveUserID` int NOT NULL,
  `Text` varchar(250) NOT NULL,
  `Location` varchar(45) NOT NULL,
  `State` enum('Sent','Read') NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (4,1,'hello','MTL','Read','2022-03-15','02:33:00',4),(1,4,'hi','MTL','Read','2022-03-15','02:50:00',5),(4,3,'hey','MTL','Read','2022-03-14','15:02:32',6),(4,1,'w4tw4t','MTL','Read','2022-03-15','16:33:40',7),(4,1,'w4tw4t','MTL','Read','2022-03-15','16:33:40',8);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `Message` varchar(250) NOT NULL,
  `Recipient` int unsigned NOT NULL,
  `Time` time NOT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `Read` tinyint NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordresetrequest`
--

DROP TABLE IF EXISTS `passwordresetrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordresetrequest` (
  `UserID` int NOT NULL,
  `Key` varchar(45) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordresetrequest`
--

LOCK TABLES `passwordresetrequest` WRITE;
/*!40000 ALTER TABLE `passwordresetrequest` DISABLE KEYS */;
INSERT INTO `passwordresetrequest` VALUES (1,'BE7CUI');
/*!40000 ALTER TABLE `passwordresetrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int unsigned NOT NULL AUTO_INCREMENT,
  `Email` varchar(45) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Telephone` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  `Role` enum('Admin','Patient','Doctor','HealthOfficial','ImmigrationOfficer') NOT NULL,
  `Password` varchar(64) NOT NULL,
  `Doctor` int unsigned DEFAULT NULL,
  `Country` varchar(45) NOT NULL,
  `Travelled` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'first@gmail.com','John','Smith','4504664852','7458 Main','Patient','JSmith0',4,'Canada',0),(2,'admin@gmail.com','Admin','Admin','5144768016','0 Admin','Admin','Admin',NULL,'Canada',0),(3,'test@gmail.com','Tester','Mann','5148758221','436 street montreal','Patient','password',4,'Canada',1),(4,'doctor@gmail.com','Doc','Lessard','7784582102','42 Health','Doctor','Doctor',NULL,'Canada',1),(5,'soucy.tommy@gmail.com','Tommy','Soucy','5144768016','1823 Langevin','Patient','password',NULL,'Canada',0),(6,'immigration@gmail.com','Immigrator','Last','5165470021','84 Kilo','ImmigrationOfficer','password',NULL,'Canada',0),(7,'tester2@gmail.com','Tester','Mann2','5144758450','84 Lane','Patient','Password',NULL,'Canada',0),(8,'testemail@gmail.com','Test3','Test','5144475801','4684 Street','Patient','password',NULL,'Canada',0),(9,'esgeg','awdawd','awdawd','516845310','se','Patient','wef',NULL,'canada',0),(10,'wef','wef','wef','wef','wwfewf','Patient','wef',NULL,'wef',0),(11,'d','d','d','d','d','Patient','d',NULL,'d',0),(12,'df','dfdfddf','dfdf','d','d','Patient','s',NULL,'d',0),(13,'153','153','153','153153','153','Patient','153',NULL,'153',0),(14,'sef','sef','sef','sef','sef','Patient','wef',NULL,'aefesf',0),(15,'test3@gmail.com','Test','Name','5144785012','34 Street','Patient','password',NULL,'Canada',0),(100,'doctorTest@gmail.com','Doc2','Test','7784582102','42 Health','Doctor','Doctor',NULL,'Canada',1),(101,'testP@gmail.com','PFirst','PLast','4504664852','7458 Main','Patient','P0',4,'Canada',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-16 16:26:53
