-- Script Date: 10/27/2016 12:37 PM  - ErikEJ.SqlCeScripting version 3.5.2.58
CREATE TABLE [Schedules] (
  [id] INTEGER  PRIMARY KEY  autoincrement  NOT NULL
, [groupId] int NOT NULL
, [instituteId] int NOT NULL
,FOREIGN KEY (groupId) REFERENCES Groups(id),
FOREIGN KEY (instituteId) REFERENCES Institutes(id)
 );
