import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { relative } from "path";

const Item: React.FC<{
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  isDesktop: boolean;
  isCollapsed: boolean;
  isDark: boolean;
  setNonMobileVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
  isDesktop,
  isDark,
  setNonMobileVisibility,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: isDark ? colors.grey[100] : colors.grey[400],
      }}
      onClick={() => {
        setSelected(title);
        if (!isDesktop) setNonMobileVisibility(false);
      }}
      icon={icon}
    >
      <Typography component="h3">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isDesktop = useMediaQuery("(min-width:600px)"); // for responsive design
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nonMobileVisibility, setNonMobileVisibility] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  console.log(isCollapsed);
  console.log(isDesktop);

  return (
    <>
      {nonMobileVisibility && !isDesktop ? (
        <Box
          onClick={() => {
            if (!isDesktop) {
              console.log("clicked");
              console.log(nonMobileVisibility);
              setNonMobileVisibility(false);
            }
          }}
          sx={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 21,
            background: "rgba(0,0,0,0.5)",
          }}
        ></Box>
      ) : null}
      <Box
        width={isDesktop ? "auto" : "270px"}
        sx={() => {
          const styleBox = {
            "& .pro-sidebar": {
              position: "relative",
            },
            "& .pro-sidebar-inner": {
              "@media (max-width: 600px)": {
                background: `radial-gradient(${colors.primary[500]}, ${colors.primary[200]})`,
              },
              "@media (min-width: 600px)": {
                background: `${colors.primary[400]} !important`,
              },
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
            "& .pro-sidebar > .pro-sidebar-inner > img.sidebar-bg": {
              opacity: "0.1 !important",
            },
          };

          const nonMobile = isDesktop
            ? {}
            : {
                position: "absolute",
                left: nonMobileVisibility ? "0px" : "-270px",
                overflow: "visible",
                transition: "left 0.3s ease-in-out",
              };

          return theme.palette.mode === "dark"
            ? {
                ...styleBox,
                ...nonMobile,
                "& .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout": {
                  backgroundColor: "rgba(18, 27, 44, 0.65)",
                },
              }
            : {
                ...styleBox,
                ...nonMobile,
                "& .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout": {
                  backgroundColor: "rgba(18, 27, 44, 0.0)",
                  position: "relative",
                },
              };
        }}
      >
        {isDesktop ? null : (
          <>
            <Box
              onClick={(e: any) => {
                e.stopPropagation();
                setNonMobileVisibility((prev) => !prev);
              }}
              sx={{
                fontSize: "2rem",
                position: "absolute",
                top: "4px",
                right: "-38px",
                width: "38px",
                height: "38px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 22,
                bgcolor:
                  theme.palette.mode === "dark" ? colors.primary[500] : "#fff",
              }}
            >
              <MenuOutlinedIcon fontSize="inherit" />
            </Box>
          </>
        )}

        <ProSidebar collapsed={isCollapsed}>
          <Menu>
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h2" color={colors.grey[100]}>
                    ADMINIS
                  </Typography>
                  {isDesktop && (
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  )}
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Ed Roh
                  </Typography>
                  <Typography variant="h4" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              sx={
                !isCollapsed
                  ? {
                      display: "nonr",
                      "@media (max-width: 600px)": {
                        display: "block",
                      },
                    }
                  : {
                      display: "block",
                      "@media (max-width: 600px)": {
                        display: "none",
                      },
                    }
              }
              paddingLeft={isCollapsed ? undefined : "1%"}
              display={isCollapsed ? "none" : "block"}
            >
              <Item
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />

              <Typography
                variant="h4"
                color={colors.grey[300]}
                m={isCollapsed ? "15px 0 5px 5px" : "15px 0 5px 20px"}
              >
                Data
              </Typography>
              <Item
                title="Manage Team"
                to="/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Invoices Balances"
                to="/invoices"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />

              <Typography
                variant="h4"
                color={colors.grey[300]}
                m={isCollapsed ? "15px 0 5px 5px" : "15px 0 5px 20px"}
              >
                Pages
              </Typography>
              <Item
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="FAQ Page"
                to="/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />

              <Typography
                variant="h4"
                color={colors.grey[300]}
                m={isCollapsed ? "15px 0 5px 5px" : "15px 0 5px 20px"}
              >
                Charts
              </Typography>
              <Item
                title="Bar Chart"
                to="/bar"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Pie Chart"
                to="/pie"
                icon={<PieChartOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Line Chart"
                to="/line"
                icon={<TimelineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
              <Item
                title="Geography Chart"
                to="/geography"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                isCollapsed={isCollapsed}
                isDesktop={isDesktop}
                setNonMobileVisibility={setNonMobileVisibility}
                isDark={theme.palette.mode === "dark"}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </>
  );
};

export default Sidebar;
