import React from "react"

const OptionLayoutModel = ({
    items: [
        {
            key: "left",
            icon: <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.15789C0 3.41384 1.11929 2 2.5 2H10.5C11.8807 2 13 3.41384 13 5.15789V10.8421C13 12.5862 11.8807 14 10.5 14H2.5C1.11929 14 0 12.5862 0 10.8421V5.15789Z" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4.5C15 3.67157 15.6716 3 16.5 3H30.5C31.3284 3 32 3.67157 32 4.5C32 5.32843 31.3284 6 30.5 6H16.5C15.6716 6 15 5.32843 15 4.5Z" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 11.5C15 10.6716 15.6716 10 16.5 10H22C22.8284 10 23.5 10.6716 23.5 11.5C23.5 12.3284 22.8284 13 22 13H16.5C15.6716 13 15 12.3284 15 11.5Z" fill="#C2C2C2" />
            </svg>
        },
        {
            key: "right",
            icon: <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5.15789C19 3.41384 20.1193 2 21.5 2H29.5C30.8807 2 32 3.41384 32 5.15789V10.8421C32 12.5862 30.8807 14 29.5 14H21.5C20.1193 14 19 12.5862 19 10.8421V5.15789Z" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.5C0 3.67157 0.671573 3 1.5 3H15.5C16.3284 3 17 3.67157 17 4.5C17 5.32843 16.3284 6 15.5 6H1.5C0.671573 6 0 5.32843 0 4.5Z" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.5C0 10.6716 0.671573 10 1.5 10H7C7.82843 10 8.5 10.6716 8.5 11.5C8.5 12.3284 7.82843 13 7 13H1.5C0.671573 13 0 12.3284 0 11.5Z" fill="#C2C2C2" />
            </svg>
        },
        {
            key: "center",
            icon: <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3.36842C11 2.06038 12.0332 1 13.3077 1H20.6923C21.9668 1 23 2.06038 23 3.36842V7.63158C23 8.93962 21.9668 10 20.6923 10H13.3077C12.0332 10 11 8.93962 11 7.63158V3.36842Z" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.5C7 12.6716 7.67157 12 8.5 12H25.5C26.3284 12 27 12.6716 27 13.5C27 14.3284 26.3284 15 25.5 15H8.5C7.67157 15 7 14.3284 7 13.5Z" fill="#C2C2C2" />
            </svg>
        },
        {
            key: "stretch",
            icon: <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" width="30" height="16" rx="3" fill="#C2C2C2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25 9C25 10.1046 24.1046 11 23 11H9C7.89543 11 7 10.1046 7 9V7C7 5.89543 7.89543 5 9 5H23C24.1046 5 25 5.89543 25 7V9Z" fill="#808080" />
            </svg>
        },

    ]
})

export default OptionLayoutModel