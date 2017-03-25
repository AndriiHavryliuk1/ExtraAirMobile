-- Script Date: 11/15/2016 16:51 PM  - ErikEJ.SqlCeScripting version 3.5.2.58
CREATE TABLE [Notes] (
  [id] INTEGER  PRIMARY KEY  autoincrement  NOT NULL
, [lessonId] int NOT NULL
, [state] int NOT NULL
, [text] nvarchar(100) NOT NULL,
FOREIGN KEY (lessonId) REFERENCES Lessons(id)
);
