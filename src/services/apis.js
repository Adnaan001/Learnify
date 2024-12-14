const BASE_URL=import.meta.env.VITE_SERVER_BASE_URL;

export const endpoints={
    SEND_OTP_API:BASE_URL+'/auth/otp',
    SIGNUP_API:BASE_URL+'/auth/signup',
    LOGIN_API:BASE_URL+'/auth/login',
    RESET_PASSWORD_TOKEN_API:BASE_URL+'/auth/resetPasswordToken',
    RESET_PASSWORD_API:BASE_URL+'/auth/resetPassword',
    GET_ALL_REVIEWS:BASE_URL+'/admin/getAllReviews'
}

export const contact={
    SUBMIT_CONTACT_FORM:BASE_URL+'/admin/contactus'
}
export const categories={
    SHOW_ALL_CATEGORIES:BASE_URL+'/course/showAllCategories',
    GET_CATEGORY_DETAILS:BASE_URL+"/course/getCategoryDetails"
}

export const profile={
    UPDATE_PROFILE_PIC:BASE_URL+'/profile/updateProfilePhoto',
    UPDATE_PROFILE:BASE_URL+'/profile/updateProfile',
    CHANGE_PASSWORD:BASE_URL+'/profile/changePassword',
    DELETE_ACCOUNT:BASE_URL+'/profile/deleteAccount',
    GET_INSTRUCTOR_STATS:BASE_URL+'/profile/instructorStats'
}

export const studentEndpoints={
    CAPTURE_PAYMENT:BASE_URL+'/payment/capturePayment',
    VERIFY_PAYMENT:BASE_URL+'/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL:BASE_URL+'/payment/sendPaymentSuccessEmail',
}
export const courseEndpoints={
    CREATE_COURSE:BASE_URL+'/course/createCourse',
    UPDATE_COURSE:BASE_URL+'/course/updateCourse',
    DELETE_COURSE:BASE_URL+'/course/deleteCourse',
    CREATE_SECTION:BASE_URL+'/course/createSection',
    UPDATE_SECTION:BASE_URL+'/course/updateSection',
    DELETE_SECTION:BASE_URL+'/course/deleteSection',
    CREATE_SUBSECTION:BASE_URL+'/course/createSubSection',
    UPDATE_SUBSECTION:BASE_URL+'/course/updateSubSection',
    DELETE_SUBSECTION:BASE_URL+'/course/deleteSubSection',
    GET_ALL_COURSES:BASE_URL+'/course/getAllCourses',
    GET_COURSE_DETAILS:BASE_URL+'/course/getCourseDetails',
    GET_INSTRUCTOR_COURSES:BASE_URL+'/course/getInstructorCourses',
    GET_ENROLLED_COURSES:BASE_URL+'/course/getEnrolledCourses',
    GET_COURSE_PROGRESS:BASE_URL+'/course/getCourseProgress',
    SET_COURSE_PROGRESS:BASE_URL+'/course/setCourseProgress',
    SET_COURSE_RATING:BASE_URL+'/course/rateCourse'
}

export const ratingEndpoints={
    RATE_COURSE:BASE_URL+"/course/rateCourse",
    GET_AVG_RATING:BASE_URL+"/course/getAvgRating"
}