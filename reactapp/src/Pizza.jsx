import { useState, useEffect } from 'react';
import PizzaList from './PizzaList';

const term = "Pizza";

function Pizza() {
    const [pizzaData, setPizzaData] = useState([]);
    const [maxId, setMaxId] = useState(0);

    useEffect(() => {
        (async () => await fetchPizzaData())()
    }, []);

    const fetchPizzaData = async () => {
        try {
            const response = await fetch('pizza');
            const pizzaData = await response.json();
            setPizzaData(pizzaData);
            setMaxId(Math.max(...pizzaData.map(pizza => pizza.id)));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const handleCreate = async (item) => {
        // Simulate creating item on API
        const newItem = { ...item, id: pizzaData.length + 1 };

        const response = await fetch('pizza', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(newItem),
        })

        if (response.ok) {
            const responseData = await response.json();
            setPizzaData([...pizzaData, responseData]);
            setMaxId(maxId + 1);
        } else {
            console.error('Error: ', response.status);
        }
    };

    const handleUpdate = async (item) => {
        // Simulate updating item on API
        const response = await fetch(`pizza/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })

        if (response.ok) {
            const updatedData = pizzaData.map(pizza => pizza.id === item.id ? item : pizza);
            setPizzaData(updatedData);
        } else {
            console.error('Error: ', response.status);
        }
    };

    const handleDelete = async (id) => {
        // Simulate deleting item on API
        const response = await fetch(`pizza/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const updatedData = pizzaData.filter(pizza => pizza.id !== id);
            setPizzaData(updatedData);
        } else {
            console.error('Error: ', response.status);
        }
    };

    const handleEditFunc = (uPizza) => {
        const updatedPizza = pizzaData.map(pizza => pizza.id == uPizza.id ? uPizza : pizza);
        setPizzaData(updatedPizza);
    }


    return (
        <div>
            <PizzaList
                name={term}
                data={pizzaData}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onEdit={handleEditFunc}
            />
        </div>
    );
}

export default Pizza;