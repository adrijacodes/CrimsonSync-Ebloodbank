// import { Link,  useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import {  useDispatch, useSelector } from 'react-redux';
// import * as yup from 'yup'
// import { loginUserAction } from '../redux/Slices/user/userSlices'; 
// import { useEffect } from 'react';

// // the from schema to check for validation
// const formSchema =yup.object({
//     email: yup.string().required("email is requried!"),
//     password: yup.string().required("password is requried!"),
// });


// const Login = () => {
// // config dispatch navigate
// const dispatch = useDispatch();
// const navigate= useNavigate();

// //formik
// const formik =useFormik({
//     initialValues:{
//         email:"",
//         password:"",
//     },
//     onSubmit: (values)=>{
//         dispatch(loginUserAction(values))
//         console.log(values)
//     },
//     validationSchema: formSchema
// });

// // 
// const storeData =useSelector((state)=> state?.users);
// const {loading, appErr, serverErr, redirectLogin, user} = storeData;

// // redirect if the login is success

// useEffect(()=>{
//     if (user) {
//       navigate("/");
//   }  
//   },[dispatch, user]);


//   return (
//     <div className="font-poppins overflow-hidden max-w-screen ">
//       <section class="bg-[#F4F7FF] py-20 lg:py-[120px] h-screen">
//         <div class="container mx-auto">
//           <div class="-mx-4 flex flex-wrap">
//             <div class="w-full px-4">
//               <div class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
//                 <div class="mb-10 text-center md:mb-16">
//                   <Link to="/" class="mx-auto inline-block">
//                     <h1 className="text-blue-800 text-3xl font-bold">
//                       SGP Ecommerce
//                     </h1>
//                   </Link>
//                 </div>
//                 <form>
//                   <div class="mb-6">
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
//                     />
//                   </div>
//                   <div class="mb-6">
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
//                     />
//                   </div>
//                   <div class="mb-10">
//                     <button
//                       type="submit"
//                       class="bordder-primary w-full cursor-pointer rounded-md border bg-blue-400 py-3 px-5 text-base text-white transition hover:bg-opacity-90"
//                     >
//                       Login
//                     </button>
//                     {/* app or server error code snipet */}
//                   </div>
//                 </form>
//                 <Link
//                   to={"/password-reset"}
//                   class="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
//                 >
//                   Forget Password?
//                 </Link>
//                 <p class="text-base text-[#adadad]">
//                   Not a member yet?{" "}
//                   <Link to={"/register"} class="text-primary hover:underline">
//                     Sign Up
//                   </Link>
//                 </p>
//                 <div>
//                   <span class="absolute top-1 right-1">
//                     <svg
//                       width="40"
//                       height="40"
//                       viewBox="0 0 40 40"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <circle
//                         cx="1.39737"
//                         cy="38.6026"
//                         r="1.39737"
//                         transform="rotate(-90 1.39737 38.6026)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="1.39737"
//                         cy="1.99122"
//                         r="1.39737"
//                         transform="rotate(-90 1.39737 1.99122)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="13.6943"
//                         cy="38.6026"
//                         r="1.39737"
//                         transform="rotate(-90 13.6943 38.6026)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="13.6943"
//                         cy="1.99122"
//                         r="1.39737"
//                         transform="rotate(-90 13.6943 1.99122)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="25.9911"
//                         cy="38.6026"
//                         r="1.39737"
//                         transform="rotate(-90 25.9911 38.6026)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="25.9911"
//                         cy="1.99122"
//                         r="1.39737"
//                         transform="rotate(-90 25.9911 1.99122)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="38.288"
//                         cy="38.6026"
//                         r="1.39737"
//                         transform="rotate(-90 38.288 38.6026)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="38.288"
//                         cy="1.99122"
//                         r="1.39737"
//                         transform="rotate(-90 38.288 1.99122)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="1.39737"
//                         cy="26.3057"
//                         r="1.39737"
//                         transform="rotate(-90 1.39737 26.3057)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="13.6943"
//                         cy="26.3057"
//                         r="1.39737"
//                         transform="rotate(-90 13.6943 26.3057)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="25.9911"
//                         cy="26.3057"
//                         r="1.39737"
//                         transform="rotate(-90 25.9911 26.3057)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="38.288"
//                         cy="26.3057"
//                         r="1.39737"
//                         transform="rotate(-90 38.288 26.3057)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="1.39737"
//                         cy="14.0086"
//                         r="1.39737"
//                         transform="rotate(-90 1.39737 14.0086)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="13.6943"
//                         cy="14.0086"
//                         r="1.39737"
//                         transform="rotate(-90 13.6943 14.0086)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="25.9911"
//                         cy="14.0086"
//                         r="1.39737"
//                         transform="rotate(-90 25.9911 14.0086)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="38.288"
//                         cy="14.0086"
//                         r="1.39737"
//                         transform="rotate(-90 38.288 14.0086)"
//                         fill="#3056D3"
//                       />
//                     </svg>
//                   </span>
//                   <span class="absolute left-1 bottom-1">
//                     <svg
//                       width="29"
//                       height="40"
//                       viewBox="0 0 29 40"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <circle
//                         cx="2.288"
//                         cy="25.9912"
//                         r="1.39737"
//                         transform="rotate(-90 2.288 25.9912)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="14.5849"
//                         cy="25.9911"
//                         r="1.39737"
//                         transform="rotate(-90 14.5849 25.9911)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="26.7216"
//                         cy="25.9911"
//                         r="1.39737"
//                         transform="rotate(-90 26.7216 25.9911)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="2.288"
//                         cy="13.6944"
//                         r="1.39737"
//                         transform="rotate(-90 2.288 13.6944)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="14.5849"
//                         cy="13.6943"
//                         r="1.39737"
//                         transform="rotate(-90 14.5849 13.6943)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="26.7216"
//                         cy="13.6943"
//                         r="1.39737"
//                         transform="rotate(-90 26.7216 13.6943)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="2.288"
//                         cy="38.0087"
//                         r="1.39737"
//                         transform="rotate(-90 2.288 38.0087)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="2.288"
//                         cy="1.39739"
//                         r="1.39737"
//                         transform="rotate(-90 2.288 1.39739)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="14.5849"
//                         cy="38.0089"
//                         r="1.39737"
//                         transform="rotate(-90 14.5849 38.0089)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="26.7216"
//                         cy="38.0089"
//                         r="1.39737"
//                         transform="rotate(-90 26.7216 38.0089)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="14.5849"
//                         cy="1.39761"
//                         r="1.39737"
//                         transform="rotate(-90 14.5849 1.39761)"
//                         fill="#3056D3"
//                       />
//                       <circle
//                         cx="26.7216"
//                         cy="1.39761"
//                         r="1.39737"
//                         transform="rotate(-90 26.7216 1.39761)"
//                         fill="#3056D3"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login