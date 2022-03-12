const { encryptPassword } = require("../../utils/authenticationUtils");
const { pool, executeTransaction } = require("../index");

const getAllUsers = async () => {
  return await pool.query("SELECT * FROM search");
};

const getUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM search WHERE email = $1", [email]);
};

const getUserById = async (userId) => {
  return await pool.query("SELECT * FROM search WHERE id = $1", [userId]);
};

const getUserGroups = async (userId) => {
  return await pool.query(
    `SELECT * FROM groups 
                            WHERE groups.id IN 
                            (SELECT group_id FROM group_members WHERE user_id=$1)`,
    [userId]
  );
};

const createUser = async (user) => {
  return await executeTransaction(async (client) => {
    const { display_name, email, birth_date, password, image } = user;
    const hashedPassword = await encryptPassword(password);
    return await client.query(
      "INSERT INTO search (display_name, email, birth_date, password, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [display_name, email, birth_date, hashedPassword, image]
    );
  });
};

const updateUser = async (user) => {
  await executeTransaction(async (client) => {
    const { id, display_name, image } = user;
    //check if await is needed
    await client.query(
      "UPDATE search SET display_name=$1, image=$2 WHERE id=$3",
      [display_name, image, id]
    );
  });
};

const searchUsers = async (query) => {
  return await executeTransaction(async (client) => {
    return await client.query(
      `SELECT id, display_name, email FROM users WHERE display_name LIKE $1 OR email LIKE $1`,
      [`%${query}%`]
    );
  });
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  getUserGroups,
  searchUsers,
};
