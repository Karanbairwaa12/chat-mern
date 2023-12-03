const apiUrl = {
  //login
  login: "login",
  forgotPassword: "forgot_password",

  //leaves
  leaves: "leaves",
  dashboardLeaves: "displayleaves",
  editLeave: "leaves/",

  //status
  status: "statuses",
  showstatus: "statuses/",
  logOut: "api/logout",

  //Attendance
  checkIn: "checkIn",
  checkOut: "checkout",

  //jobOpening
  jobOpenings: "job_openings",

  //contact us
  contactUs: "contact_us",

  //update user profile
  userProfile: "users/update_user/",

  //add new user
  addUser: "users/new_user",

  //displayProfile
  display: "displayleaves",

  //dashboard
  dashboard: "/dashboard?period",

  //userprofile
  user: "users/",

  //salaryINFO
  salary: "salary_slips?period=",

  //bankdetails
  bank: "bank_details/",

  //punchIn
  punchIn: "check_in_out/check_in",

  //punchout
  punchOut: "check_in_out/check_out",

  //Disable
  disable: "users/disable_user/",

  //TDS
  tds: "tds",

  //serviceAvailable
  serviceAvailable: "services",

  //applyJob
  applyJob: "job_openings/:id/apply",

  //subscribeApi
  subscribeApi: "subscriptions",

  //MyTeams
  MyTeams: "my_team?designation=",

  //changePassword
  changePassword: "users/change_password/",

  //gadgets
  gadgets: "gadgets",

  //chat
  chat: "chat/search?search=",
  createChats: "chats",
  message: "messages",

  //download_tds
  downloadTDS: "download_tds_csv",

  //download_assets
  downloadAssets: "download_gadget_csv",

  //companyTax
  companyTax: "company_tax",

  //clients
  clients: "clients",
};

export default apiUrl;
