import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { TypeAnimation } from 'react-type-animation';
import './style.scss';
import ResultSearch from "../../components/SearchResult";
import axios from "axios";

function SearchResultList ({searchText, searchResult}){

    if (searchResult.length == 0) {
        return  <p className="search-result">Không tìm thấý Kết quả cho <b className="search-text">{searchText}</b></p>

    }
    return (
        <>
        <p className="search-result">Kết quả tìm kiếm cho <b className="search-text">{searchText}</b></p>
        <div className="ResultSearchList">
            {
                searchResult.map((product, index) => {
                    return <ResultSearch
                        key={index} {...product} />

                })}
        </div>  
        </>
    )
}

function AllProductList( {products} ) {
    if (products.length == 0) {
        return <p className="no-result">Không tìm thấy sản phẩm nào</p>
    }

    return (
        <div className="ProductList">
            {
                products.map((product, index) => {
                    return <Product
                        key={index} {...product} />

                })
            }
        </div>
    )
    
}

export default function Homepage() {

    const [products, setProducts] = useState([])
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const fetchAllProducts = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product`)
        
        if (response.data.code == 200) {
            setProducts(response.data.data)
        } else {
            alert(response.data.message)
        }
    }
        
    const handleChange = (e) => {
        if (e.target.value.length == 0) {
            setShowSuggestion(false)
            // setShowSearchResult(false)
        }
        setSearchText(e.target.value)
        autoSuggest(e.target.value)
    }

    const handleFocus = async () => {
        // setShowSearchResult(true)
        await autoSuggest(searchText)
    }
    
    const autoSuggest = async (text) => {
        // do not send request if text is empty
        if (text.length == 0) { return }
        console.log('text: ', text)
        const body = {
            "name": text
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/autocomplete`, body);


        if (response.data.code == 200) {
            setSearchSuggestions(response.data.data)
            setShowSuggestion(true)
        } else {
            alert(response.data.message)
        }
    }

    const handleBlur = () => {
        // Delay hiding the result container to allow time for clicking on the result
        setTimeout(() => {
            setShowSuggestion(false);
        }, 200); // Adjust the delay time as needed
    }

    const handleClickSuggestion = (text) => {
        setSearchText(text)
    }

    const handleSelectSuggestion = () => {
        let currentSuggestionIndex = searchSuggestions.findIndex(suggestion => suggestion.productName == searchText)
        if (currentSuggestionIndex == -1) {
            currentSuggestionIndex = 0
        }
        if (currentSuggestionIndex == searchSuggestions.length - 1) {
            currentSuggestionIndex = 0
        } else {
            currentSuggestionIndex += 1
        }

        setSearchText(searchSuggestions[currentSuggestionIndex].productName)
    }

    const handleSearch = async (e) => {
        setShowSuggestion(false)
        const body = {
            "name": searchText
        }
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/search`, body);
        
        if (response.data.code == 200) {
            setSearchResults(response.data.data)
            setShowSearchResult(true)
        } else {
            alert(response.data.message)
        }
    }

    // const products = [
    //     {
    //         name: "Điện thoại Samsung Galaxy A52",
    //         description: "Điện thoại Samsung Galaxy A52 với màn hình AMOLED và camera đa chức năng.",
    //         price: 7990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.xBXALBAK7_FVcKxWES3_7gHaFa?w=222&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Máy tính xách tay Dell XPS 15",
    //         description: "Máy tính xách tay Dell XPS 15 được thiết kế cao cấp cho năng suất và sáng tạo.",
    //         price: 17990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.m43IKTf7WCZ0TN7g3vtgYwHaE6?w=302&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Tai nghe Sony WH-1000XM4",
    //         description: "Tai nghe Sony WH-1000XM4 với chức năng chống ồn xuất sắc và chất lượng âm thanh cao.",
    //         price: 3490000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.Up4jgVS4B6cqH02nrKQg2AHaEK?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Smart TV Samsung 4K",
    //         description: "Tận hưởng giải trí sống động với Smart TV Samsung 4K, mang đến chất lượng hình ảnh tuyệt vời và tính năng thông minh.",
    //         price: 8990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.p-2c4bYx0OCRE8odZUzQvAHaE8?w=244&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Laptop Dell XPS 13",
    //         description: "Laptop Dell XPS 13 mỏng nhẹ với hiệu suất ấn tượng, là công cụ hoàn hảo cho công việc và giải trí.",
    //         price: 13990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.aU7tmFAq4W19NA4PpPKuIgHaEK?w=279&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Máy ảnh Sony Alpha a7 III",
    //         description: "Máy ảnh Sony Alpha a7 III cho khả năng chụp ảnh và quay video tuyệt đẹp.",
    //         price: 19990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.LVyVMwOwzwaRS73R_4cq6wHaE-?w=251&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Đồng hồ thông minh Samsung Galaxy Watch 4",
    //         description: "Đồng hồ thông minh Samsung Galaxy Watch 4 giúp bạn theo dõi sức khỏe và kết nối liên lạc.",
    //         price: 2490000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.yQ2sIlqB1I7Qa0m86W0FjgHaFj?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Màn hình LG UltraWide",
    //         description: "Nâng cao hiệu suất làm việc và trải nghiệm game với màn hình LG UltraWide.",
    //         price: 5990000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.nhtN8vr48gz6e4jc1CHzVwHaEz?w=246&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Ổ cứng SSD Samsung 1TB",
    //         description: "Nâng cấp lưu trữ với ổ cứng SSD Samsung 1TB tốc độ cao.",
    //         price: 1490000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.LdH-Tj8AaqU2iYUhLkOxvQHaFm?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Tai nghe Bose QuietComfort Earbuds",
    //         description: "Thưởng thức âm thanh xuất sắc và khả năng chống ồn với tai nghe Bose QuietComfort Earbuds.",
    //         price: 2790000,
    //         imageUrl: "https://th.bing.com/th/id/OIP.1nQ_K6hPi8xSLubYomffxAHaGT?w=216&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    //     },
    //     {
    //         name: "Điện thoại iPhone 13",
    //         description: "Điện thoại iPhone 13 với hiệu suất mạnh mẽ và tính năng camera nâng cao.",
    //         price: 15990000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Laptop ASUS ROG Strix G15",
    //         description: "Laptop ASUS ROG Strix G15 dành cho game thủ với hiệu suất vượt trội.",
    //         price: 24990000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Máy tính bảng Samsung Galaxy Tab S7",
    //         description: "Máy tính bảng Samsung Galaxy Tab S7 với màn hình AMOLED và bút S Pen.",
    //         price: 14990000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Tai nghe Huawei FreeBuds 4i",
    //         description: "Tai nghe Huawei FreeBuds 4i với chất lượng âm thanh tuyệt vời và khả năng chống ồn.",
    //         price: 1690000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Chuột gaming Logitech G Pro X Superlight",
    //         description: "Chuột gaming Logitech G Pro X Superlight với thiết kế nhẹ và nút bấm nhanh chóng.",
    //         price: 2190000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Đồng hồ thông minh Garmin Forerunner 245",
    //         description: "Đồng hồ thông minh Garmin Forerunner 245 giúp bạn theo dõi sức khỏe và tập luyện.",
    //         price: 4690000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Tai nghe Razer Kraken",
    //         description: "Tai nghe Razer Kraken dành cho game thủ với âm thanh mạnh mẽ và đệm tai êm ái.",
    //         price: 1890000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Chuột không dây Microsoft Arc",
    //         description: "Chuột không dây Microsoft Arc với thiết kế gập gọn tiện lợi.",
    //         price: 790000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Máy in HP LaserJet Pro MFP M428fdw",
    //         description: "Máy in HP LaserJet Pro MFP M428fdw với khả năng in đa chức năng và hiệu suất cao.",
    //         price: 6590000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     },
    //     {
    //         name: "Thiết bị định vị ô tô Garmin DriveSmart 55",
    //         description: "Thiết bị định vị ô tô Garmin DriveSmart 55 giúp bạn dẫn đường và liên kết điện thoại.",
    //         price: 3490000,
    //         imageUrl: "https://images.unsplash.com/photo-1554387845-bc7be54b8fe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5MjcxNTYxOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
    //     }
    // ];

    // const suggestions = ["điện thoại ", "lorem asdaqwe 21 ", "wq asd qwe e", "asdqwe qwa"];

    const guidetexts = [
        'Hãy thử tìm kiếm với từ khóa "điện thoại"', 300,
        'Hãy thử tìm kiếm với từ khóa "dien thoai"', 300,
        'Hãy thử tìm kiếm với từ khóa "tai nghe"', 300,
        'Hãy thử tìm kiếm với từ khóa "màn hình"', 300,
        'Hãy thử tìm kiếm với từ khóa "ổ cứng"', 300
    ]

    const handleBack = () => {
        setSearchText("")
        setSearchResults([])
        setShowSearchResult(false)
    }


    return (
        <div className="Home">
            <div className="Banner">
                <TypeAnimation
                    sequence={guidetexts}
                    wrapper="span"
                    speed={40}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                />
            </div>

            <div className="SearchBox">
                <div className="input-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text"
                        placeholder='Tìm kiếm sản phẩm'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={searchText}
                        onChange={handleChange}
                        onKeyDown={ e => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            } else if (e.key === 'ArrowDown') {
                                handleSelectSuggestion()
                            }
                        }
                    }

                    />
                </div>
                <div className="result-container">
                    {
                        showSuggestion && searchSuggestions.map((suggestion) => {
                            return <p className="result"
                                onClick={() => handleClickSuggestion(suggestion.productName)}
                                dangerouslySetInnerHTML={{ __html: suggestion.productNameWithHighlight }}></p>
                        })}

                </div>
            </div>
j
            {showSearchResult ? 
                <>
                <p className="back-btn" onClick={handleBack}><i class="fa-solid fa-arrow-left" ></i>Back to home</p>
                <SearchResultList 
                    searchResult={searchResults}
                    searchText={searchText}
                />
                </>

                :
                <AllProductList
                    products={products}
                />            
            }

        </div>
        
    )
}