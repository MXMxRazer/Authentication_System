const fetchData = async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character`);
    return res.json();
}

export default async function Data() {
    const data = await fetchData();
    console.log(data.results[2].name);
    return (
        <div>
            <h1>here</h1>
            {
                data.results.map((ele: any) => {
                    return (
                        <h1
                            key={ele.id}
                        >{ele.name}</h1>
                    )
                })
            }
        </div>
    );
}