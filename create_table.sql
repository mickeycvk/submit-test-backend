CREATE TABLE IF NOT EXISTS Interview (
  interview_id UUID PRIMARY KEY, 
  detail TEXT NOT NULL,
  interview_status VARCHAR(255) NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  is_saved_flag BOOLEAN,
  email VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Comment (
  comment_id UUID PRIMARY KEY,
  interview_id UUID NOT NULL,
  detail TEXT NOT NULL,
  commented_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  CONSTRAINT fk_interview 
     FOREIGN KEY(interview_id) 
     REFERENCES Interview(interview_id)
);
