-- Script Date: 10/27/2016 12:31 PM  - ErikEJ.SqlCeScripting version 3.5.2.58
CREATE TABLE [Lessons] (
  [id] INTEGER NOT NULL
, [title] nvarchar(100) NOT NULL
, [lector] nvarchar(100) NOT NULL
, [auditory] nvarchar(100) NOT NULL
, [frequency] int NOT NULL
, [subgroup] int NOT NULL
, [number] int NOT NULL
, [dayId] int NOT NULL
, CONSTRAINT [PK_Lessons] PRIMARY KEY ([id])
);
