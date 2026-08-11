const neo4j = require("neo4j-driver");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

async function testConnection() {
  const session = driver.session();

  try {
    const result = await session.run(
      "RETURN 'SupportGraph connected successfully!' AS message"
    );

    console.log(result.records[0].get("message"));
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

testConnection();