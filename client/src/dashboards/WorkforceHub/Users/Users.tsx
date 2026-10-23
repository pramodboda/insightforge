

async function getUsers() {


    try {
        // const response = await fetch("http://localhost:3001/api/health");
        const response = await fetch("http://localhost:3001/api/users100");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}
export default function Users() {


    return (<>
        Users
        <button onClick={getUsers}>Hylo</button>
    </>)
}