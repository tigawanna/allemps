

1
-- create channelmebers table
CREATE TABLE members (
    user_id uuid,
    channel_id uuid,
  PRIMARY KEY(user_id, channel_id)
);

