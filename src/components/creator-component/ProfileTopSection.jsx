import profilePic from "../../assest/profile.jpg";
import background from "../../assest/background.jpg";
import userinfo from "./userinfo";
import posts from "../../assest/profile/posts.svg";
import collection from "../../assest/profile/collections-b.svg";
import { useEffect, useState } from "react";

export default function ProfileTopic() {
  let isPublicProfile = false;
  let isCurrentUser = true;
  let isLoggedIn = false;

  let userinfo1 = userinfo;
  let topMainBackground = { backgroundImage: `url(${background})` };

  let mode = "posts";

  let modes = [
    {
      text: "Posts",
      imgUrl: posts,
      name: "posts",
    },
    {
      text: "Collections",
      imgUrl: collection,
      name: "collections",
    },
  ];

  return (
    <>
      <section className="profile-top-section">
        <div style={{ padding: "20px" }}>
          <div className="top-main" style={topMainBackground}>
            {!isPublicProfile && (
              <>
                {isCurrentUser && isLoggedIn && (
                  <div className="account-settings button">
                    Account settings
                  </div>
                )}
                {isCurrentUser && isLoggedIn && (
                  <div
                    className="account-settings button"
                    style={{ left: "24px", right: "auto" }}
                  >
                    Display public profile
                  </div>
                )}
                {!isCurrentUser && isLoggedIn && (
                  <div
                    className={`account-settings button ${
                      userinfo1.isFollowed ? "followed" : ""
                    }`}
                  >
                    {!userinfo1.isFollowed && <span>+ Follow</span>}
                    {userinfo1.isFollowed && (
                      <>
                        <span className="following">Following</span>
                        <span className="unFollow"> Unfollow </span>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
            <div className="img-wrap">
              <img src={profilePic} alt="" />
            </div>
          </div>

          <div className="user-data text-center">
            <h1 className="font-gt"> {userinfo1.username} </h1>
          </div>

          {userinfo.myInterests.length > 0 && (
            <div className="featured">
              <h1 className="font-gt heading text-center">Communities</h1>
              <div className="carousel-wrap">{/* p-carousel */}</div>
            </div>
          )}
        </div>
      </section>

      <section className="profile-top-section">
        <div style={{ padding: "20px" }}>
          <div className="post-collection-toggle d-flex">
            {modes.map((item) => {
              return (
                <div
                  className={`item d-flex align-items-end ${
                    item.name == mode ? "active" : ""
                  }`}
                >
                  <img src={item.imgUrl} alt="" />
                  <p className="m-0 text">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
