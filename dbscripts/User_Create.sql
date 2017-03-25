-- Script Date: 11/24/2016 18:18 PM  - ErikEJ.SqlCeScripting version 3.5.2.64
CREATE TABLE [User] (
  [id] INTEGER  PRIMARY KEY  autoincrement  NOT NULL
, [instituteId] INTEGER NULL
, [groupId] INTEGER NULL
, [IsSet] INTEGER NULL
, FOREIGN KEY (instituteId) REFERENCES Institutes(id),
FOREIGN KEY (groupId) REFERENCES Groups(id)
);
