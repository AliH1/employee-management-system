
export const getISODate = () => {
  let yourDate = new Date()
  yourDate.toISOString().split('T')[0];
  return yourDate;
}