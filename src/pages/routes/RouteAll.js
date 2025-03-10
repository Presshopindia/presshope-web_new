import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import Content from "../Content";
import Login from "../Login";
import Signup from "../Signup";
// import Eror404 from '../404eror';
// import Feed from '../Feed';
import AllContents from "../AllContents";
import Task from "../Task";
import BroadcastedList from "../BroadcastedList";
import BroadcastedTasks from "../BroadcastedTasks";
import SignupSuccess from "../SignupSuccess";
// import Forgotpassword from '../Forgotpassword';
// import Resetpassword from '../Resetpassword';
// import Feeddetail from "../Feeddetail";
//import Contentunderofferdetail from '../contentunderofferdetail';

import TransactionDetail from "../TransactionDetail";
import LandingPage from "../LandingPage";
// import Other from '../Other';
import Reports from "../Reports";
// import Myprofile from '../Myprofile';
import Purchasedcontent from "../PurchasedContent";
// import PurchasedcontentShared from '../PurchasedcontentShared';
import FavouritedContent from "../FavouritedContent";
import Onboard from "../Onboard";
import Uploaddocs from "../Uploaddocs";
import Addpaymentdetails from "../Addpaymentdetails";
import Tandc from "../Tandc";
import ContentUnderOffer from "../ContentUnderOffer";
import UploadedContent from "../UploadedContent";
import SourcedContent from "../SourcedContent";
import ContentDetailChat from "../ContentDetailChat";
import Success from "../Success";
// import UserLogin from '../UserLogin';
import UserForgetPassword from "../UserForgetPassword";

import PrivateRoute from "./PrivateRoute";

import PostTandc from "../postlogin/PostTandc";
import ResetPassword from "../ResetPassword";
import Myprofilemdl from "../../component/Myprofilemdl";
import PublishedContent from "../PublishedContent";
import PostPrivacyPolicy from "../PostPrivacyPolicy";
import Chat from "../Chat";
import ContactusPre from "../ContactusPre";
import ContactusPost from "../postlogin/ContactusPost";
import Tasktables from "../../component/Tasktables";
import Accounts from "../Accounts";
import ManageUsers from "../ManageUsers";
import UploadedContentDetails from "../UploadedContentDetails";
import HopperUploadedContent from "../HopperUploadedContent";
import Contenttables from '../../component/Contenttables';
import AllTutorials from "../AllTutorials";
import RatingReview from "../RatingReview";
import OnboardUserN from "../OnboardUserN";
import SignupUserN from "../SignupUserN";
import AutoInvoice from "../AutoInvoice";
import TaskInvoice from "../TaskInvoice";

// import LoginUserN from "../LoginUserN";
import FAQPostLogin from "../postlogin/FAQPostLogin";
import ManagePaymentslogin from "../ManagePaymentslogin";
import ManagePaymentMethod from "../ManagePaymentMethod";
import CheckoutForm from "../../component/StripePaymentForm";
import ReportsTablesContent from "../../component/ReportsTablesContent";
import DashboardTables from "../../component/DashboardTables";
import ReportsTablesTask from "../../component/ReportsTablesTask";
import AccountsTables from "../../component/AccountsTables";
// import Contenttables from "../../component/Contenttables";
import RelatedContent from "../RelatedContent";
import MoreContentFromUser from "../MoreContentFromUser";
//import ContentunderofferdetailN from '../ContentUnderOfferDetail';
import ContentunderofferdetailNew from "../ContentUnderOfferDetailnew";
import ContentSearch from "../ContentSearch";
import SourcedContentDetail from "../SourcedContentDetail";
import PurchasedContentDetail from "../PurchasedContentDetail";
import PrePrivacyPolicy from "../PrePrivacyPolicy";
import ArchieveDates from "../ArchieveDates";
import ArchieveItems from "../Archieve";
import GooglePay from "../TestGooglePay";
import Invoice from "../Invoice";
import HopperContent from "../HopperContent";
import MoreContentFromUserForTask from "../MoreContentFromUserForTask";
import RelatedContentTask from "../RelatedContentForTask";
import NewPublishedContent from "../NewPublishedContent";
import Feeddetail from "../Feeddetail";
import Basket from "../Basket";
import FeeddetailCopy from "../FeeddetailCopy";
import BroadcastedTasksSoon from "../BroadcastedTasksSoon";
import UploadDocPost from "../UploadDocPost";
import TandcPre from "../TandcPre";
import PurchasedTaskContentDetail from "../PurchasedTaskContentDetail";
function RouteAll() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={token ? <Navigate to="/dashboard/exclusive" /> : <Login />} />

          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/onboard-user-n" element={<OnboardUserN />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/upload-docs" element={<Uploaddocs />} />
          <Route path="/upload-doc-post" element={<UploadDocPost />} />
          <Route path="/add-payment-details" element={<Addpaymentdetails />} />
          <Route path="/terms-and-conditions" element={<Tandc />} />
          <Route path="/pre-privacy-policy" element={<PrePrivacyPolicy />} />
          <Route path="/test-google-pay" element={<GooglePay />} />

          <Route
            path="/User-Forget-Password"
            element={<UserForgetPassword />}
          />
          <Route path="/SignupSuccess" element={<SignupSuccess />} />
          <Route path="/User-Reset-Password" element={<ResetPassword />} />
          <Route
            exact
            path="/"
            element={
              !token ? (
                <Navigate to="/landing-page" />
              ) : (
                <Navigate to="/dashboard/exclusive" />
              )
            }
          />
          <Route path="/contact-us" element={<ContactusPre />} />
          <Route path="/Success" element={<Success />} />
          {/* <Route path="/Success" element={<PrivateRoute Component={Success} />} /> */}

          <Route exact path="/dashboard/:type" element={<PrivateRoute Component={Dashboard} />} />
          <Route path="/all-contents" element={<PrivateRoute Component={AllContents} />} />
          <Route path="/broadcasted-taks" element={<PrivateRoute Component={BroadcastedTasks} />} />
          <Route path="/task" element={<PrivateRoute Component={Task} />} />
          <Route path="/broadcastList" element={<PrivateRoute Component={BroadcastedList} />} />
          <Route path="/" element={<PrivateRoute Component={Task} />} />
          {/* <Route path="/broadcasted-taks" element={<PrivateRoute Component={BroadcastedTasksSoon} />} /> */}
          {/* <Route path="/broadcasted-taks-soon" element={<PrivateRoute Component={BroadcastedTasksSoon} />} /> */}
          <Route path="/content/:tab1/:tab2/:tab3" element={<PrivateRoute Component={Content} />} />
          {/* <Route path="/feed" element={<PrivateRoute Component={Feed} />} /> */}
          {/* <Route path="/Forgotpassword" element={<PrivateRoute Component={<Forgotpassword />} /> */}
          {/* <Route path="/Resetpassword" element={<PrivateRoute Component={<Resetpassword />} /> */}

          <Route
            path="/Feeddetail/:type/:id"
            element={<PrivateRoute Component={Feeddetail} />}
          />
          <Route
            path="/FeeddetailCopy/:type/:id"
            element={<PrivateRoute Component={FeeddetailCopy} />}
          />

          <Route
            path="/transactionDetail/:id"
            element={<PrivateRoute Component={TransactionDetail} />}
          />
          {/* <Route path="/Other" element={<PrivateRoute Component={Other} />} /> */}
          <Route
            path="/reports/:type"
            element={<PrivateRoute Component={Reports} />}
          />
          {/* <Route path="/Myprofile" element={<PrivateRoute Component={Myprofile} />} /> */}
          <Route
            path="/purchased-content/:type"
            element={<PrivateRoute Component={Purchasedcontent} />}
          />
          {/* <Route path="/purchased-content-shared" element={<PrivateRoute Component={PurchasedcontentShared} />} /> */}
          <Route
            path="/Favourited-Content"
            element={<PrivateRoute Component={FavouritedContent} />}
          />
          <Route
            path="/Content-Under-Offer"
            element={<PrivateRoute Component={ContentUnderOffer} />}
          />
          <Route
            path="/Uploaded-Content/:type"
            element={<PrivateRoute Component={UploadedContent} />}
          />
          <Route
            path="/hopper-task-content/:task_id"
            element={<PrivateRoute Component={HopperUploadedContent} />}
          />
          <Route
            path="/Sourced-Content"
            element={<PrivateRoute Component={SourcedContent} />}
          />
          {/* <Route
            path="/Content-Detail-Chat"
            element={<PrivateRoute Component={ContentDetailChat} />}
          /> */}

          {/* <Route path="/Success" element={<PrivateRoute Component={PostTandc} />} /> */}

          {/* <Route
            path="/published-content"
            element={<PrivateRoute Component={PublishedContent} />}
          /> */}
          <Route
            path="/published-content"
            element={<PrivateRoute Component={NewPublishedContent} />}
          />
          <Route
            path="/post-login-tandc"
            element={<PrivateRoute Component={PostTandc} />}
          />
          <Route
            path="/pre-login-tandc"
            element={<TandcPre />}
          />
          <Route
            path="/my-profile"
            element={<PrivateRoute Component={Myprofilemdl} />}
          />
          <Route
            path="/privacy-policy"
            element={
              <PrivateRoute
                Component={PostPrivacyPolicy}

              />
            }
          />

          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />
          <Route
            path="/contact-us-post"
            element={<PrivateRoute Component={ContactusPost} />}
          />
          <Route
            path="/content-details/:id"
            element={<PrivateRoute Component={UploadedContentDetails} />}
          />
          <Route path="/task-tables/:type" element={<Tasktables />} />
          <Route path="/content-tables/:type" element={<Contenttables />} />
          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/rating-and-review" element={<RatingReview />} />

          <Route path="/accounts" element={<Accounts />} />
          <Route path="/all-tutorials" element={<AllTutorials />} />
          {/* new routes */}
          <Route path="/signup-user-n/:name/:number/:vat/:email/:first_name/:last_name/:user_id" element={<SignupUserN />} />
          {/* <Route path="/login-user-n" element={<LoginUserN />} /> */}
          <Route path="/auto-invoice/:id" element={<AutoInvoice />} />
          <Route path="/task-invoice/:id" element={<TaskInvoice />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/faq-post" element={<FAQPostLogin />} />
          <Route
            path="/manage-payment-login"
            element={<ManagePaymentslogin />}
          />
          <Route
            path="/manage-payment-method"
            element={<ManagePaymentMethod />}
          />
          <Route path="/docs-stripe" element={<CheckoutForm />} />
          {/* Tables routes */}
          <Route
            path="/reports-tables-content/:type"
            element={<ReportsTablesContent />}
          />
          <Route path="/dashboard-tables/:type" element={<DashboardTables />} />
          <Route
            path="/reports-tables-task/:type"
            element={<ReportsTablesTask />}
          />
          <Route path="/accounts-tables/:type" element={<AccountsTables />} />
          <Route path="/broadcasted-taks/:id" element={<PrivateRoute Component={BroadcastedTasks} />} />

          <Route path="/related-content/:content_id" element={<RelatedContent />} />
          <Route path="/related-content-task/:tag_id/:hopper_id/:category_id" element={<RelatedContentTask />} />
          <Route path="/more-content/:hopper_id" element={<MoreContentFromUser />} />
          <Route path="/more-content-task/:hopper_id/:task_id" element={<MoreContentFromUserForTask />} />
          <Route
            path="/content-under-offer-detail/:id"
            element={<ContentunderofferdetailNew />}
          />
          <Route path="/content-search/:type" element={<ContentSearch />} />
          <Route path="/hopper-content/:hopper_id" element={<HopperContent />} />
          <Route path="/sourced-content-detail/:id" element={<SourcedContentDetail />} />
          <Route path="/purchased-content-detail/:id" element={<PurchasedContentDetail />} />
          <Route path="/purchased-task-content-detail/:id" element={<PurchasedTaskContentDetail />} />
          <Route path="/archieve-dates" element={<ArchieveDates />} />
          <Route path="/archieve-items/:startDate/:endDate" element={<ArchieveItems />} />

          {/* New routes End */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteAll;
