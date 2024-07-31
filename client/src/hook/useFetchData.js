

export default async function useFetchData(url,formdata){
    const res = await fetch(`http://localhost:4000/api/v1/user/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formdata }),
      });
      const data = await res.json();
      let error = "";
      if (!res.ok) {
        error = data.message;
      }

      return [data,error];
}