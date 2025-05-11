CREATE TYPE "quiz_visibility" AS ENUM (
  'public',
  'private'
);

CREATE TYPE "quiz_question_type" AS ENUM (
  'multiple_choice',
  'true_false',
  'fill_in_the_blank'
);

CREATE TYPE "activity_type" AS ENUM (
  'liked_quiz',
  'updated_quiz',
  'added_favorite',
  'created_quiz'
);

CREATE TYPE "occupation_type" AS ENUM (
	'student',
	'teacher',
	'developer',
	'designer',
	'marketer',
	'manager',
	'writer',
	'other'
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "hashed_password" text NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "date_of_birth" date NULL,
  "occupation" occupation_type NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer,
  "updated_at" timestamp NOT NULL,
  "updated_by" integer
);

CREATE TABLE "quizzes" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "visibility" quiz_visibility NOT NULL,
  "questions" json NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer NOT NULL,
  "updated_at" timestamp NOT NULL,
  "updated_by" integer NOT NULL
);

CREATE TABLE "activities" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "activity_type" activity_type NOT NULL,
  "activity" json NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer NOT NULL
);

CREATE TABLE "quiz_likes" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "quiz_id" integer NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer NOT NULL
);

CREATE TABLE "quiz_play_histories" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "quiz_id" integer NOT NULL,
  "score" integer NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer NOT NULL
);

CREATE TABLE "recent_views" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "quiz_id" integer NOT NULL,
  "created_at" timestamp NOT NULL,
  "created_by" integer NOT NULL,
  "updated_at" timestamp NOT NULL,
  "updated_by" integer NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id");

ALTER TABLE "quizzes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "quizzes" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "quizzes" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id");

ALTER TABLE "activities" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "activities" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "quiz_likes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "quiz_likes" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "quiz_likes" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "quiz_play_histories" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "quiz_play_histories" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "quiz_play_histories" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "recent_views" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "recent_views" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "recent_views" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "recent_views" ADD FOREIGN KEY ("updated_by") REFERENCES "users" ("id");

COMMENT ON COLUMN "users"."created_by" IS 'Tracks the user who created this record for auditing purposes';

COMMENT ON COLUMN "users"."updated_by" IS 'Tracks the user who last updated this record for auditing purposes';

COMMENT ON COLUMN "quizzes"."user_id" IS 'Tracks the user associated with this activity';

COMMENT ON COLUMN "quizzes"."questions" IS 'JSON array containing question objects with fields like type, text, and options';

COMMENT ON COLUMN "quizzes"."created_by" IS 'self reference for quiz creation';

COMMENT ON COLUMN "quizzes"."updated_by" IS 'Tracks the user who last updated this record for auditing purposes';

COMMENT ON COLUMN "activities"."user_id" IS 'Tracks the user associated with this activity';

COMMENT ON COLUMN "activities"."activity" IS 'Stores user activity data in JSON format, expected to include fields like type, timestamp, and details';

COMMENT ON COLUMN "activities"."created_by" IS 'self reference for activity creation';

COMMENT ON COLUMN "quiz_likes"."user_id" IS 'Tracks the user associated with this activity';

COMMENT ON COLUMN "quiz_likes"."quiz_id" IS 'Tracks the quiz associated with this activity';

COMMENT ON COLUMN "quiz_likes"."created_by" IS 'self reference for quiz like creation';

COMMENT ON COLUMN "quiz_play_histories"."user_id" IS 'Tracks the user associated with this activity';

COMMENT ON COLUMN "quiz_play_histories"."quiz_id" IS 'Tracks the quiz associated with this activity';

COMMENT ON COLUMN "quiz_play_histories"."score" IS 'must be non-negative';

COMMENT ON COLUMN "quiz_play_histories"."created_by" IS 'self reference for quiz play history creation';

COMMENT ON COLUMN "recent_views"."user_id" IS 'Tracks the user associated with this activity';

COMMENT ON COLUMN "recent_views"."quiz_id" IS 'Tracks the quiz associated with this activity';

COMMENT ON COLUMN "recent_views"."created_at" IS 'Timestamp of when the quiz was viewed';

COMMENT ON COLUMN "recent_views"."created_by" IS 'Tracks the user who first viewed this record for auditing purposes';

COMMENT ON COLUMN "recent_views"."updated_at" IS 'Timestamp of when the quiz was last viewed';

COMMENT ON COLUMN "recent_views"."updated_by" IS 'Tracks the user who last updated this record for auditing purposes';
