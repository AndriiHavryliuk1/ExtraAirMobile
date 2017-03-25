-- Script Date: 10/27/2016 12:35 PM  - ErikEJ.SqlCeScripting version 3.5.2.58
CREATE TABLE [Days] (
  [id] INTEGER  PRIMARY KEY  autoincrement  NOT NULL
, [title] nvarchar(100) NOT NULL
, [number] int NOT NULL
, [scheduleId] int NOT NULL
, FOREIGN KEY (scheduleId) REFERENCES Schedules(id)
);
