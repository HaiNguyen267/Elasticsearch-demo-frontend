import axios from "axios";
export const truncateString = (str, num) => {
    if (str.split(" ").length <= num) {
        return str;
    }
    const words = str.split(" ");
    const truncated = words.slice(0, num).join(" ");
    return truncated + "...";
}

export const formatPrice = (price) => {
    // add VND to the price and add period after every 3 digits
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
