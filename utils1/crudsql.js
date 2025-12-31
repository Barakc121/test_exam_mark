import mysql from "mysql2/promise";

async function mysqlConnect() {
  const connection = await mysql.createConnection({
    user: "root",
    password: "root",
  });
  console.log("Connected to mysql");
  return connection;
}

export const conn = await mysqlConnect();

export async function initDb() {
  await conn.query("Create database if not exists ecommerce");
  await conn.query("use ecommerce;");
  console.log("Database ecommerce created");
}

export async function initOrdersTable() {
  await conn.query(`CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId VARCHAR(24) NOT NULL,
    quantity INT NOT NULL,
    customerName VARCHAR(255) NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
}

const order = {
    productId: '24sfdvdxfhy675',
    quantity: 2,
    customerName: 'Mark',
    totalPrice: 500.5,
}

export async function createOrder(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `insert into orders (${keys.join(", ")}) values (${keys
    .map(() => "?")
    .join(", ")})`;
  await conn.query(query, values);
  console.log("Order created");
}

export async function updateOrder(data, id) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `Update orders set ${keys
    .map((key) => `${key} = ?`)
    .join(", ")} where id = ?`;
  await conn.query(query, [...values, id]);
  console.log('Connected')
}

export async function getById(id) {
    const [result] = await conn.query('Select * from orders where id = ?', [id]);
    return result[0]
}

export async function getAllOrders(){
    const [result] = await conn.query('Select * from orders');
    return result;
}

export async function removeOrder(id){
     await conn.query('delete from orders where id = ?', [id]);    
     console.log(`User ${id} deleted`);
}


await initDb();
// await initOrdersTable();
// await createOrder(order)
order.customerName = 'Barak';
console.log(await getAllOrders())

console.log('_______')
await removeOrder(1)
console.log(await getAllOrders())
