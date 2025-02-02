import { Slide, toast } from "react-toastify";

// Sorting function for total fund invested (account table)-
export const accountTotalFundInvestedContentPurchase = (data) => {
    data?.sort((a, b) => {
        const monthA = a?._id?.month;
        const yearA = a?._id?.year;
        const monthB = b?._id?.month;
        const yearB = b?._id?.year;

        if (yearA !== yearB) {
            return yearB - yearA;
        } else {
            return monthB - monthA;
        }
    });
    return data;
}


// Monthly Increasing Order-
export const monthlyIncreasingOrder = (data) => {
    data?.sort((a, b) => {
        const monthA = a?._id?.month;
        const yearA = a?._id?.year;
        const monthB = b?._id?.month;
        const yearB = b?._id?.year;

        if (yearA !== yearB) {
            return yearA - yearB;
        } else {
            return monthA - monthB;
        }
    });

    return data;
}

// Monthly Decreasing Order-
export const monthlyDecreasingOrder = (data) => {
    data?.sort((a, b) => {
        const monthA = a?._id?.month;
        const yearA = a?._id?.year;
        const monthB = b?._id?.month;
        const yearB = b?._id?.year;

        if (yearA !== yearB) {
            return yearB - yearA;
        } else {
            return monthB - monthA;
        }
    });
    return data;
}


// Monthly Decreasing Order For Content Type-
export const monthlyDecreasingOrderForContentType = (data) => {
    data?.sort((a, b) => {
        const monthA = a?.month;
        const yearA = a?.year;
        const monthB = b?.month;
        const yearB = b?.year;

        if (yearA !== yearB) {
            return yearB - yearA;
        } else {
            return monthB - monthA;
        }
    });
    return data;
}


// Capitalize word-
// export const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);
export const capitalizeWord = (word) => {
    if (!word) return ''; // If word is null, undefined, or empty, return an empty string
    return word.charAt(0).toUpperCase() + word.slice(1);
};



// Success toaster function-
export const successToasterFun = (title) => {
    return toast.success(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
}


// Trend-
export const trendPercentageFun = (first, second) => {
    let percent = 0;
    let sign = "";

    if ((second - first) < 0) {
        percent = (((first - second) / first) * 100)?.toFixed(2);
        sign = "Decrease";
        return { percent, sign };
    }
    else if ((second - first) > 0) {
        percent = (((second - first) / second) * 100)?.toFixed(2);
        sign = "Increase";
        return { percent, sign };
    }
    else {
        return { percent, sign };
    }
};


export const addVat = (amount) => {
    return (amount + (amount * 20) / 100)
}

export const blobImageUrl = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const newUrl = URL.createObjectURL(blob);
        return newUrl;
    } catch (error) {
        console.error("Error fetching or creating blob:", error);
        return null;
    }
}

export const formattingUserData = async (data) => {
    try {
        return {
            admin_rignts: {
                allowed_to_onboard_users: data.admin_rignts.allowed_to_onboard_users,
                allowed_to_deregister_users: data.admin_rignts.allowed_to_deregister_users,
                allowed_to_assign_users_rights: data.admin_rignts.allowed_to_assign_users_rights,
                allowed_to_set_financial_limit: data.admin_rignts.allowed_to_set_financial_limit,
                allowed_complete_access: data.admin_rignts.allowed_complete_access,
                allowed_to_broadcast_tasks: data.admin_rignts.allowed_to_broadcast_tasks,
                allowed_to_purchase_content: data.admin_rignts.allowed_to_purchase_content,
                allow_to_chat_externally: data.admin_rignts.allow_to_chat_externally,
                price_range: {
                    minimum_price: data?.admin_rignts?.price_range?.minimum_price,
                    maximum_price: data?.admin_rignts?.price_range?.maximum_price
                }
            },
            _id: data._id,
            company_name: data?.media_house_id?.company_name,
            createdAt: data.createdAt,
            administator_email: data.administator_email,
            office_id: data.office_id._id,
            designation_id: data.designation_id._id,
            department_id: data.department_id._id,
            phone: data.phone,
            country_code: data.country_code,
            profile_image: data.profile_image,
            email: data.email,
            first_name: data.first_name,
            full_name: data.full_name,
            last_name: data.last_name
        }
    }
    catch (error) {
        console.log(error)
    }
}


// Has decimal-
export const hasDecimal = (value) => {
    return value % 1 !== 0;

}

// Change USD format-
export const formatAmountInMillion = (amount) => {
    // console.log("amount  amount ----->>>>>>>>>", amount);
    return (Math.floor(amount)?.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    }) + receiveLastTwoDigits(amount) || "")
};


// Applied promocode value - 
export const appliedPromoodeValue = (amount, off) => {
    return (+(amount)) - ((+(amount) * off) / 100)
}

//Total Amount after promocode and vat
export const totalAmountAfterPromocodeAndVat = (amount, off) => {

    let amountAfterPromo = (+(amount)) - ((+(amount) * off) / 100)
    let total = amountAfterPromo + amountAfterPromo * (1 / 5)
    return (+total)
}

// Receive last 2 digits-
export const receiveLastTwoDigits = (number) => {
    return (+(number) % 1)?.toFixed(2)?.toString()?.replace(/^0/, '') > 0 ? (+(number) % 1)?.toFixed(2)?.toString()?.replace(/^0/, '') : ""
}