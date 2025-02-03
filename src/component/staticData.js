// Variables-
const localAdmin = JSON.parse(localStorage.getItem("AdminPopup"));
const officeDetail = (localStorage.getItem("OfficeDetails"));
const UserEmailId = (localStorage.getItem("UserEmailId"));


// Admin detail initial state for sign up page-
export const adminDetailInitState = {
  company_details: {
    company_name: JSON.parse(localStorage.getItem("CompanyDetails"))?.company_name || "",
    company_number: JSON.parse(localStorage.getItem("CompanyDetails"))?.company_number || "",
    company_vat: JSON.parse(localStorage.getItem("CompanyDetails"))?.company_vat || "",
    profile_image: JSON.parse(localStorage.getItem("CompanyDetails"))?.profile_image || "",
    user_type: JSON.parse(localStorage.getItem("CompanyDetails"))?.user_type || "Kind"
  },
  office_details: {
    name: "",
    complete_address: "",
    latitude: "",
    longitude: "",
    phone: "",
    country_code: "",
    city: "",
    country: "",
    post_code: "",
    website: "",
    office_type: "option1",
  },
  administrator_details: {
    full_name: localAdmin?.first_name + " " + localAdmin?.last_name,
    first_name: localAdmin?.first_name,
    last_name: localAdmin?.last_name,
    office_name: "",
    designation_id: localAdmin?.designation_id,
    department: "",
    admin_profile: "",
    country_code: "",
    phone: "",
    office_email: localAdmin?.user_email,
  },
  admin_rights: {
    allowed_to_onboard_users: true,
    allowed_to_deregister_users: true,
    allowed_to_assign_users_rights: true,
    allowed_to_set_financial_limit: true,
    allowed_complete_access: true,
    allowed_to_broadcast_tasks: true,
    allowed_to_purchase_content: false,
    price_range: {
      minimum_price: "",
      maximum_price: "",
    },
  },
}


// Multi office for sign up-
const multiOffice = {
  company_name: "",
  company_number: "",
  company_vat: "",
  profile_image: "",
  name: "",
  office_type_id: "",
  address: {
    country: "",
    city: "",
    complete_address: "",
    Pin_Location: { lat: "", long: "" },
    location: { type: "Point", coordinates: ["", ""] },
    pincode: "",
  },
  country_code: "",
  phone: "",
  website: `https://${""}`,
  is_another_office_exist: false,
}
export const multiOfficeInitState = (officeDetail && JSON.parse(officeDetail).length > 0) ? JSON.parse(officeDetail) : [multiOffice]


// Sign up top level heading-
export const joinTribeHeadingSignUp = "Join our growing tribe, and connect directly with the people. Please add your company, offices, and employee details to register"


// Content purchased from task summary (Graph in reports task table)-
export const purchasedTaskSummaryReportTaskGraph = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
    colors: ["#20639B"],
  },
  series: [
    {
      name: "sales",
      data: [],
    },
  ],
}


// Initial state of purchased content for sort filter in content reports-
export const initStateOfSortFilterPurchasedContent = (data) => {
  return {
    sortField: "",
    sortValue: "",
    timeRange: {
      start: "",
      emd: ""
    },
    favContent: false,
    type: [],
    category: [],
    change: false
  }
}


// Initial state of content summary in content report-
export const initStateOfContentSummary = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#EC4E54"],
  },
  series: [
    {
      name: "sales",
      data: [],
    },
  ],
}

export const initStateOfContentSourcedAndFundInvested = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#20639B"],
  },
  series: [
    {
      name: "sales",
      data: [],
    },
  ],
}

export const initStateOfTaskGraph = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
    colors: ["#EC4E54"],
  },
  series: [
    {
      name: "sales",
      data: [],
    },
  ],
}


// Initial user of add user manage use-
export const initStateOfAddUserInManageUser = {
  admin_password: "",
  full_name: "",
  type: "",
  address: "",
  pincode: "",
  country_code: "",
  city: "",
  country: "",
  phone_no: "",
  website: "",
  first_name: "",
  last_name: "",
  designation: "",
  select_office_name: "",
  profile_image: null,
  select_user_office_department: "",
  email: "",
  phone_no: "",
  allow_to_complete: false,
  allow_to_broadcat: false,
  allow_to_chat_externally: false,
  allow_to_purchased_content: false,
  min_price: "",
  max_price: "",
  onboard_other_user: false,
  user_id: "",
  office_id: "",
  admin_right: {
    allow_to_complete: false,
    allow_to_broadcat: false,
    allow_to_chat_externally: false,
    allow_to_purchased_content: false,
  },
  uniqueId: ""
}

export const newInitStataOfAddUserInManageUser = {
  admin_rignts: {
    allowed_to_onboard_users: false,
    allowed_to_deregister_users: false,
    allowed_to_assign_users_rights: false,
    allowed_to_set_financial_limit: false,
    allowed_complete_access: false,
    allowed_to_broadcast_tasks: false,
    allowed_to_purchase_content: false,
    allow_to_chat_externally: false,
    price_range: {
      minimum_price: null,
      maximum_price: null
    }
  },
  administator_email: "",
  office_id: "",
  designation_id: "",
  department_id: "",
  phone: "",
  country_code: "",
  profile_image: "",
  email: "",
  first_name: "",
  full_name: "",
  last_name: "",
  uniqueId: "",
  media_house_id: "",
  status: "approved"
}


// Initial state of account filter and sort-
export const initStateOfSortFilterAccount = {
  sort: "",
  priceRange: {
    start: 0,
    end: 0
  },
  task: "false",
  content: "false",
  payment_made: "false",
  payment_pending: "false",
  active: "false"
}


// Initial state of content under offer-
export const initStateOfUnderOffer = {
  filter: {
    favContent: "",
    latestContent: "false",
    type: [],
    category: [],
    active: "false",
    filter: "false"
  },
  sort: {
    active: "",
    field: "",
    sort: "false"
  },
  data: [],
  categoryData: []
}


// Initial state of purchased content-
export const initStateOfPurchaseContent = {
  filter: {
    favContent: "",
    latestContent: "false",
    type: [],
    category: [],
    active: "false",
    filter: "false"
  },
  sort: {
    active: "false",
    field: "",
    sort: "false"
  },
  data: [],
  categoryData: []
}


// Initial state of purchased content-
export const initStateOfFavouriteContent = {
  filter: {
    favContent: "true",
    latestContent: "false",
    type: [],
    category: [],
    active: "false",
    filter: "false"
  },
  sort: {
    active: "false",
    field: "",
    sort: "false"
  },
  data: [],
  categoryData: [],
  page: 1
}


// Initial state of feed-
export const initStateOfFeed = {
  filter: {
    isDiscount: true,
    favContent: "",
    content: "latest",
    type: ["shared", "exclusive"],
    category: ["64f09d79db646e4f7791761b", "64f09d1fdb646e4f779174a1"],
    active: "false",
    filter: "false"
  },
  sort: {
    active: "",
    field: "",
    sort: "false"
  },
  data: [],
  categoryData: [],
  title: ""
}


// Initial state of uploaded content-
export const initStateOfUploadedContent = {
  filter: {
    favContent: "",
    latestContent: "false",
    type: [],
    category: [],
    active: "false",
    filter: "false"
  },
  sort: {
    active: "",
    field: "",
    sort: "false"
  },
  data: [],
  categoryData: []
}


export const feedTitle = (data1, data2) => {
  return data1 == "latest" ? "Latest" : data1 == "true" ? "Favourited" : data1 == "shared" ? "Shared" : data1 == "exclusive" ? "Exclusive" : data1 == true ? "Special" : data2?.find((el) => el?._id == data1)?.name
}

export const feedDynamicRoute = (data1, data2) => {
  return data1 == "latest" ? "/Uploaded-Content/all" : data1 == "true" ? "/Favourited-Content" : data1 == "shared" ? "/Uploaded-Content/shared" : data1 == "exclusive" ? "/Uploaded-Content/exclusive" : data1 == true ? "/Uploaded-Content/Special" : `/Uploaded-Content/${data2?.find((el) => el?._id == data1)?.name}`
}

// Manage user heading-
export const manageUserTopHeading = (a, b) => {
  return `Hi ${a + " " + b}, please enter your adminstrator password to add new users, or remove existing users.`
}
