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
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountrequest`
--

LOCK TABLES `accountrequest` WRITE;
/*!40000 ALTER TABLE `accountrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `AID` int unsigned NOT NULL,
  `PID` int unsigned NOT NULL,
  `DID` int unsigned NOT NULL,
  `LevelOfEmergency` int NOT NULL,
  `Priority` int NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  UNIQUE KEY `AID_UNIQUE` (`AID`),
  UNIQUE KEY `PID_UNIQUE` (`PID`),
  UNIQUE KEY `DID_UNIQUE` (`DID`)
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
  `Time` time NOT NULL
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
  `Age` int unsigned NOT NULL,
  `Weight` decimal(5,2) unsigned NOT NULL,
  `Height` decimal(5,2) unsigned NOT NULL,
  `lastUpdateTime` time NOT NULL,
  `SympDescription` varchar(100) NOT NULL,
  `Temperature` int NOT NULL,
  `Fever` tinyint NOT NULL,
  `BreathingIssues` tinyint NOT NULL,
  `Cough` tinyint NOT NULL,
  `LostTasteSmell` tinyint NOT NULL,
  `MusclePain` tinyint NOT NULL,
  `Diarrhea` tinyint NOT NULL,
  `Vomitting` tinyint NOT NULL,
  `Nausea` tinyint NOT NULL,
  `Headache` tinyint NOT NULL,
  `SoreThroat` tinyint NOT NULL,
  PRIMARY KEY (`PID`,`fillOutDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `healthstatus`
--

LOCK TABLES `healthstatus` WRITE;
/*!40000 ALTER TABLE `healthstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `healthstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordresetrequest`
--

DROP TABLE IF EXISTS `passwordresetrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordresetrequest` (
  `UserID` int NOT NULL,
  `Key` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordresetrequest`
--

LOCK TABLES `passwordresetrequest` WRITE;
/*!40000 ALTER TABLE `passwordresetrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `passwordresetrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int unsigned NOT NULL,
  `Email` varchar(45) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Telephone` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  `Role` enum('Admin','Patient','Doctor','HealthOfficial','ImmigrationOfficer') NOT NULL,
  `Password` varchar(64) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'first@gmail.com','John','Smith','4504664852','7458 Main','Patient','JSmith'),(1,'admin@gmail.com','Admin','Admin','5145556453','0 Admin','Admin','Admin');
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

-- Dump completed on 2022-01-24 19:41:45
