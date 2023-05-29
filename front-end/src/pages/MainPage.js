import '../App.css';
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Layout from "../components/Layout";
import axios from "axios";
import React, {useEffect, useState} from "react";

function MainPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [order, setOrder] = useState("Rating High to Low");
    const [data, setData] = useState([]);
    const [value, setValue] = useState(7);
    const [num, setNum] = useState(250);

    useEffect( () => {
        const handleFormSubmit = async () => {
            console.log(order);
            await axios.post('http://localhost:5000', {data: searchTerm, grt_n: value, order: order, num:num}).then(
                res => {
                    setData(res.data);
                }
            )
        };
        handleFormSubmit();
    }, [searchTerm, value, order, num])
    const fetchData = async (url) => {
        await axios.get(url).then(
            res => {
                setData(res.data);
            }
        )
    };

    useEffect(() => {
        fetchData('http://localhost:5000');
    }, [])

    return (
        <div className="App">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Filter value={value} setValue={setValue} order={order} setOrder={setOrder} num={num} setNum={setNum}/>
            <Layout data={data}/>
        </div>

    );
}

export default MainPage;
