export const getTodos = async (filters = {
  search: "",
  sortItem: "date",
  sortOrder: "desc"
}) => {
  try {
    const filtersQuery = new URLSearchParams(filters);
    const response = await fetch(`http://localhost:8081/api/Records?${filtersQuery}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    console.log(filters)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const data = await response.json();

    if (data.records && Array.isArray(data.records)) {
      console.log(data.records);
      return data.records;
    } else {
      console.warn('Сервер вернул данные без поля records или records не массив:', data);
      return [];
    }
  } catch (e) {
    console.error(e)
    return [];
  }
}