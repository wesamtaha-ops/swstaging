import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/providers/AuthProvider";
import { CreateFormButton } from "../common/CreateFormButton";
import { NavDropdown } from "./NavDropdown";
import { ProductsMenu } from "./ProductsMenu";
import { IndustriesMenu } from "./IndustriesMenu";
import { ResourcesMenu } from "./ResourcesMenu";
import { TemplatesMenu } from "./TemplatesMenu";
import { MobileMenu } from "./MobileMenu";
import { AvatarDropdown } from "./AvatarDropdown";
import { Logo } from "@/components/common/Logo";
import { Bell, CheckCircle, AlertTriangle, Clock, Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  timestamp: string;
  read: boolean;
}
export type TabType = "dashboard" | "forms";

interface Tab {
  id: TabType;
  name: string;
  icon: React.ElementType;
}

interface AccountTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const svgDash = () => (
  <svg
    className="mr-2 text-lg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.072 7.64136V3.91207C18.072 2.75386 17.5463 2.28564 16.2402 2.28564H12.9216C11.6156 2.28564 11.0898 2.75386 11.0898 3.91207V7.63314C11.0898 8.79957 11.6156 9.25957 12.9216 9.25957H16.2402C17.5463 9.26779 18.072 8.79957 18.072 7.64136Z"
      fill="#9C9F9A"
    />
    <path
      d="M18.072 16.8823V13.5637C18.072 12.2576 17.5463 11.7319 16.2402 11.7319H12.9216C11.6156 11.7319 11.0898 12.2576 11.0898 13.5637V16.8823C11.0898 18.1884 11.6156 18.7141 12.9216 18.7141H16.2402C17.5463 18.7141 18.072 18.1884 18.072 16.8823Z"
      fill="#9C9F9A"
    />
    <path
      d="M8.62472 7.64136V3.91207C8.62472 2.75386 8.09901 2.28564 6.79294 2.28564H3.47436C2.16829 2.28564 1.64258 2.75386 1.64258 3.91207V7.63314C1.64258 8.79957 2.16829 9.25957 3.47436 9.25957H6.79294C8.09901 9.26779 8.62472 8.79957 8.62472 7.64136Z"
      fill="#9C9F9A"
    />
    <path
      d="M8.62472 16.8823V13.5637C8.62472 12.2576 8.09901 11.7319 6.79294 11.7319H3.47436C2.16829 11.7319 1.64258 12.2576 1.64258 13.5637V16.8823C1.64258 18.1884 2.16829 18.7141 3.47436 18.7141H6.79294C8.09901 18.7141 8.62472 18.1884 8.62472 16.8823Z"
      fill="#9C9F9A"
    />
  </svg>
);
const svgForm = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 "
  >
    <path
      d="M11.8956 2.28516H8.03492C7.18064 2.28516 6.48242 2.97516 6.48242 3.82944V4.60159C6.48242 5.45587 7.17242 6.14587 8.02671 6.14587H11.8956C12.7499 6.14587 13.4399 5.45587 13.4399 4.60159V3.82944C13.4481 2.97516 12.7499 2.28516 11.8956 2.28516Z"
      fill="#282828"
    />
    <path
      d="M14.2675 4.60186C14.2675 5.90794 13.1997 6.97579 11.8936 6.97579H8.03288C6.72681 6.97579 5.65895 5.90794 5.65895 4.60186C5.65895 4.14186 5.16609 3.85436 4.75538 4.06794C3.59717 4.68401 2.80859 5.90794 2.80859 7.31258V15.0422C2.80859 17.0629 4.45967 18.714 6.48038 18.714H13.4461C15.4668 18.714 17.1179 17.0629 17.1179 15.0422V7.31258C17.1179 5.90794 16.3293 4.68401 15.1711 4.06794C14.7604 3.85436 14.2675 4.14186 14.2675 4.60186ZM10.2754 14.5658H6.67752C6.34074 14.5658 6.06145 14.2865 6.06145 13.9497C6.06145 13.6129 6.34074 13.3337 6.67752 13.3337H10.2754C10.6122 13.3337 10.8915 13.6129 10.8915 13.9497C10.8915 14.2865 10.6122 14.5658 10.2754 14.5658ZM12.4275 11.2801H6.67752C6.34074 11.2801 6.06145 11.0008 6.06145 10.664C6.06145 10.3272 6.34074 10.0479 6.67752 10.0479H12.4275C12.7643 10.0479 13.0436 10.3272 13.0436 10.664C13.0436 11.0008 12.7643 11.2801 12.4275 11.2801Z"
      fill="#282828"
    />
  </svg>
);

export const navTav: Tab[] = [
  { id: "dashboard", name: "Dashboard", icon: svgDash },
  { id: "forms", name: "Forms", icon: svgForm },
];

const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "New Form Response",
    message: "Customer Feedback Survey received a new response",
    type: "success",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Form Shared",
    message: "Jane Smith shared Event Registration Form with you",
    type: "info",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Response Limit Warning",
    message: "Job Application Form is approaching response limit",
    type: "warning",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "New Comment",
    message: "Mike left a comment on Product Survey",
    type: "info",
    timestamp: "5 hours ago",
    read: true,
  },
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [selectedLanguage, setSelectedLanguage] = useState("En");

  useEffect(() => {
    const handleScroll = () => {
      setActiveDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200" >
      {window.location.pathname !== "/forms" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />

              <div className="hidden lg:flex lg:ml-10 lg:space-x-8 ">
                <NavDropdown
                  title={t("navigation.products")}
                  isOpen={activeDropdown === "products"}
                  onMouseEnter={() => handleMouseEnter("products")}
                  onMouseLeave={handleMouseLeave}
                >
                  <ProductsMenu />
                </NavDropdown>

                <NavDropdown
                  title={t("navigation.industries")}
                  isOpen={activeDropdown === "industries"}
                  onMouseEnter={() => handleMouseEnter("industries")}
                  onMouseLeave={handleMouseLeave}
                >
                  <IndustriesMenu />
                </NavDropdown>

                <NavDropdown
                  title={t("navigation.templates")}
                  isOpen={activeDropdown === "templates"}
                  onMouseEnter={() => handleMouseEnter("templates")}
                  onMouseLeave={handleMouseLeave}
                >
                  <TemplatesMenu />
                </NavDropdown>

                <NavDropdown
                  title={t("navigation.resources")}
                  isOpen={activeDropdown === "resources"}
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                >
                  <ResourcesMenu />
                </NavDropdown>

                <Link
                  to="/pricing"
                  className="inline-flex items-center px-1 pt-1 text-sm font-almarai text-gray-700 hover:text-indigo-600"
                >
                  {t("navigation.pricing")}
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications Dropdown */}
                  {/* <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="w-96 bg-white rounded-lg shadow-lg border border-gray-200 py-1 mt-2"
                        sideOffset={5}
                        align="end"
                      >
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h3 className="text-sm font-almarai text-gray-900">
                            Notifications
                          </h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <DropdownMenu.Item
                              key={notification.id}
                              className="focus:outline-none"
                              onSelect={() => markAsRead(notification.id)}
                            >
                              <div
                                className={`px-4 py-3 hover:bg-gray-50 ${
                                  !notification.read ? "bg-indigo-50" : ""
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 pt-0.5">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="ml-3 w-0 flex-1">
                                    <p className="text-sm font-almarai text-gray-900">
                                      {notification.title}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {notification.message}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                      {notification.timestamp}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DropdownMenu.Item>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200">
                          <Link
                            to="/notifications"
                            className="text-sm text-indigo-600 hover:text-indigo-500 font-almarai"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root> */}

                  {/* <CreateFormButton /> */}
                  <AvatarDropdown onLogout={logout} />
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-almarai transition-colors duration-200"
                  >
                    {t("navigation.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-almarai"
                  >
                    {t("navigation.signup")}
                  </Link>
                </div>
              )}

              {/* Dropdown Langue */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 focus:outline-none">
                    🌍 {i18n.language === "ar" ? "العربية" : "English"}
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    sideOffset={5}
                    align="end"
                  >
                    <DropdownMenu.Item
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onSelect={() => changeLanguage("en")}
                    >
                      English
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onSelect={() => changeLanguage("ar")}
                    >
                      العربية
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden ml-4">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">{t("navigation.open_menu")}</span>
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={logout}
      />
    </nav>
  );
}


