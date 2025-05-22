import { useState } from "react";
import { AccountTabs, TabType } from "@/components/account/AccountTabs";
import { ProfileTab } from "@/components/account/ProfileTab";
import { NotificationsTab } from "@/components/account/NotificationsTab";
import { TeamTab } from "@/components/account/TeamTab";
import { ChevronLeft } from "lucide-react";
import { AvatarDropdown } from "../navigation/AvatarDropdown";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

export default function Account() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("team");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { t, i18n } = useTranslation();



  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      // case "subscription":
      //   return <SubscriptionTab />;
      case "notifications":
        return <NotificationsTab />;
      case "team":
        return (
          <TeamTab
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen w-full flex-col lg:flex-row font-almarai"

      >
        <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col fixed top-0 left-0 bottom-0">

          {/* Partie supérieure : Logo et retour au Dashboard */}
          <div className="flex flex-col items-center py-6">
            {/* Logo */}
            <svg
              width="180"
              height="50"
              viewBox="0 0 209 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink"
            >
              <rect width="209" height="50" fill="url(#pattern0_607_6017)" />
              <defs>
                <pattern
                  id="pattern0_607_6017"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_607_6017"
                    transform="matrix(0.00567376 0 0 0.024 -0.0035461 -0.489744)"
                  />
                </pattern>
                <image
                  id="image0_607_6017"
                  width="200"
                  height="75"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>

            {/* Dashboard Link */}
            <Link to="/dashboard">
              <div className="flex items-center justify-center my-5">
                <button className="p-4 w-auto flex justify-center items-center rounded-md border text-gray-500 bg-gray-50 text-sm font-almarai shadow-sm hover:bg-gray-300 hover:text-white">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  {t("account.returnToDashboard")}
                </button>
              </div>
            </Link>
          </div>

          {/* Menu Sidebar */}
          <div className="flex-grow">
            {/* Insère ici le contenu de ton menu */}
            <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Partie inférieure : Avatar et Nom de l'utilisateur */}

          {/* Bas de la sidebar */}
          <div className="flex flex-col items-center space-y-4 p-4 mt-auto">
            <button
              type="submit"
              className=" p-2 space-x-2 w-full flex bg-orange-50 border-yellow-300 justify-center items-center rounded-md border  text-md font-almarai text-yellow-500  hover:bg-yellow-100 "
            >
              <Link
                to={"/pricing"}
                className=" p-2 space-x-2 w-full flex  justify-center "
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xlinkHref="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="0.5"
                    width="20"
                    height="20"
                    fill="url(#pattern0_607_6005)"
                  />
                  <defs>
                    <pattern
                      id="pattern0_607_6005"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_607_6005"
                        transform="scale(0.0078125)"
                      />
                    </pattern>
                    <image
                      id="image0_607_6005"
                      width="128"
                      height="128"
                      preserveAspectRatio="none"
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFs0lEQVR4Ae1d0VXjMBBUCZRACZRACZRACSmBEiiBEiiBf2JCCZSQDnSYUyCR48SSdrXr3bn3eIeJLUszK2k0Xish4B8QAAJAAAgAASAABIAAEAACQAAIAAEgAASAwC8CcRdu4hAe4xCe0s8m7sLt7wn4xS4CcRse4hD2cQjxzM+z3ZajZSH1+nPEH//tDVAZRCDuwt2Fnn8cAOPvjwYh8NukNOd/nRnyc+IPx19+0TLY8jiEzwLyf4LAIAw+mxQ/wksp+eP5PtEy1urvOX9TQz4CwEAgpOXeYU4v/f/TAAR+m1Co+KfB8RFe/KK38pYnxV8s+rKpYrNyGPxWPw7hLSNz2sPPu4B/572He78IrrjltYp/EjC7cLNiGHxWfaHN+9fL50cBmEBrC6H4Hu4nvXie4GtBgGcBawqA8TFugcd/jfzx86c1td91XYkU/2lQbMODa1DX1Pi4Da+EQ///QNiFuzVh4LaucQjP5OTjGcA64olQ8Z8O/0OAANQeAsnmzYmjOYYFrJv+JPrm8vkoggAWsNYQYFH8uVcAC1gr/SGQ2bw56UfHelvvvGYpd59iiL9UBixgjXHWmNhxifDTz7bhVWP7XdepObHjaHhf4BnAAtYUbUn0laRyn/boMvLjONJoar/7utSkci/o5fNBgncD9cRcD8WfB4ue1juvSUsqd05qwTEsYA1xR5zYMT/cT/UB3gqWDoDOij8PDrwMKhkAXWzeaa//CwJYwJL0h/G9/fZU7ksEX/lMtvXO7y6h+DNxiNfApGKQMbHjb3i/0vvHtDKp9ru+L2tixzXSTz+HBdw7EhlSuZf3+FPy47j07N1+1/cTV/x5AMAC7huPLKncOanLj/d9W+/8blyp3JmqL5kOYAH3ikkVin86MsAC7hEAwjZvyYjAce64WYVfqzmJPs5Ubg7SOMp8G7Ho0eHU3EOd4p9OARxEXyrT15SjwOa9RIbMZ16WnUKJHTKklo0s9p3HbqncZcBrCQ7bAeBc8S8JMrsBkERfv1TudY4AdpeE3VO51xcAe7NLQSj+s19Bk08JNnu/Ups3B1/62KYHIJjKLU1oyf1tPnSC4l807H+anPdh8y4ifxR9Nredk07lbsgBKBm62861mm6mMLGjjSie5SQU/yp6KQf5VrebS/M+nu1fDhq7L5pgvX9V+H2ZVPyHDJNOu3VpnM+X1Mmu4kcAXO35PvYYwggwGwg+tphNr3QtGQ79nGNV8R+G/fx/eAAno4BNmzcn/fg4LQVFN3RQ4i/YfbZ/TPjc72lJ2PoNnWudKuwr/jnie/9d6ZRj0+btTe6S+yl86GQ3qXMJIb3PIf5OwLYpB9vJ9KVf2bLTn+LvS/f0borSzUbRdzutIf7CioAa59FqVg8rewSFK9lOBoqfgMuqIsRfNPFm81axxHiRsONnM5WbkS/SooUFIBQ/KZsVhQnuLwCbt4Iv8kvELGCrqdzkDDEXKGQB+0jsYOaOpPjuAhCKn4Q3kkIELGC7qdwkjHQupPMeQ7ZTuTtzR3K7jhYwFD8JY8SFdLOA8XWxxMwRFfedbtZjoykkdhDxRV4M+woAip+cM7ICO1jAsHnJ2GIoiNkCHkWfrx27GThiLZJxuzkoflbmiApntICR2EHEEWsxTALQ5h59rEwIFJ62nWtL3c5370AqtwCTlbdksICh+Cu5ELmM2AIeRR9SuUWYrLwpqQBEYkclC4KXEVrAUPyCPFbdOu070C4AYfNW4S9+EZEFjFRucSYrK0BgAUPxV2Kv4rJGCxg2rwoWGyrR9BoYEjsakFdyaYMFjFRuJRw2VaMqAKD4mzBXdXFFACCVWxWDjZUpNIGQyt2It7rLC5aBUPzq2COq0MJnAbB5ifBWWcyFt4L34+NilZVGpWgRSO8GbtLj4aefbWmRzEkLMkoDAkAACAABIAAEgAAQAAJAAAgAASAABFaPwD+6jYq05y+gQAAAAABJRU5ErkJggg=="
                    />
                  </defs>
                </svg>
                <p>{t("account.upgrade")}</p>{" "}
              </Link>
            </button>

            {user && (
              <div className="w-full flex items-center p-4 border-gray-300 border  bg-gray-50 rounded-md hover:bg-gray-300 ">
                <img
                  src="https://img.freepik.com/vecteurs-premium/avatar-icon0002_750950-43.jpg?semt=ais_hybrid"
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="text-sm font-almarai text-gray-900">
                    {user.username.length > 20
                      ? user.username.slice(0, 15) + "..."
                      : user.username}
                  </div>
                  <div className="text-gray-500 font-almarai text-sm">
                    {user?.role === "companyOwner"
                      ? `${user?.companyId?.name}${t("account.company")}`
                      : ["workspaceOwner", "editor", "viewer"].includes(
                        user?.role
                      )
                        ? `${user?.workspaceId?.name}${t("account.workspace")}`
                        : user?.email}
                  </div>
                </div>
                <AvatarDropdown onLogout={logout} />
              </div>
            )}
          </div>
        </aside>

        <main className="flex-grow  p-6 font-almarai pl-80 overflow-auto">
          <div className="flex flex-col h-full   ml-10 ">
            {renderTabContent()}

            {totalPages > 1 && (
              <div className="flex mt-auto justify-center">
                <ReactPaginate
                  previousLabel={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  nextLabel={
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"flex justify-center space-x-2 mt-4"}
                  pageClassName={"px-3 py-1 border rounded-lg"}
                  activeClassName={"bg-blue-500 text-white"}
                  previousClassName={
                    "px-3 py-1 border rounded-lg flex items-center"
                  }
                  nextClassName={
                    "px-3 py-1 border rounded-lg flex items-center"
                  }
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}



