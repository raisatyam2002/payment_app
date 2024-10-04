"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import SideBarItem from "../components/SideBarItem";
import { relative } from "path";

type Anchor = "top" | "left" | "bottom" | "right";

export function SideDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <SideBarItem
          title="home"
          icon={<HomeIcon />}
          href="/dashboard"
        ></SideBarItem>
        <SideBarItem
          title="transfer"
          icon={<TransferIcon />}
          href="/transfer"
        ></SideBarItem>
        <SideBarItem
          title="transaction"
          icon={<TransactionsIcon />}
          href="/transactions"
        ></SideBarItem>
        <SideBarItem
          title="P2P "
          icon={<P2PICON />}
          href="/p2pTransfer"
        ></SideBarItem>
      </List>
    </Box>
  );

  return (
    <div className="sideDrawer block md:hidden w-12 p-0 text-center fixed top-20 left-0 z-10 ">
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <SideDrawerIcon></SideDrawerIcon>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: {
                width: "100%",
                top: "64px", // Adjusting the drawer's top position
                // backgroundColor: "gray",
              },
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
function TransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
function P2PICON() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );
}
function SideDrawerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      id="menu-chocolate"
    >
      <path
        fill="#000"
        fill-rule="evenodd"
        d="M3 11C3 10.4477 3.44772 10 4 10H6C6.55228 10 7 10.4477 7 11V13C7 13.5523 6.55228 14 6 14H4C3.44772 14 3 13.5523 3 13V11ZM11 10C10.4477 10 10 10.4477 10 11V13C10 13.5523 10.4477 14 11 14H13C13.5523 14 14 13.5523 14 13V11C14 10.4477 13.5523 10 13 10H11ZM11 17C10.4477 17 10 17.4477 10 18V20C10 20.5523 10.4477 21 11 21H13C13.5523 21 14 20.5523 14 20V18C14 17.4477 13.5523 17 13 17H11ZM17 11C17 10.4477 17.4477 10 18 10H20C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H18C17.4477 14 17 13.5523 17 13V11ZM18 17C17.4477 17 17 17.4477 17 18V20C17 20.5523 17.4477 21 18 21H20C20.5523 21 21 20.5523 21 20V18C21 17.4477 20.5523 17 20 17H18ZM4 17C3.44772 17 3 17.4477 3 18V20C3 20.5523 3.44772 21 4 21H6C6.55228 21 7 20.5523 7 20V18C7 17.4477 6.55228 17 6 17H4Z"
        clip-rule="evenodd"
        opacity=".4"
      ></path>
      <path
        fill="#000"
        fill-rule="evenodd"
        d="M3 4C3 3.44772 3.44772 3 4 3H6C6.55228 3 7 3.44772 7 4V6C7 6.55228 6.55228 7 6 7H4C3.44772 7 3 6.55228 3 6V4ZM10 4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6C14 6.55228 13.5523 7 13 7H11C10.4477 7 10 6.55228 10 6V4ZM18 3C17.4477 3 17 3.44772 17 4V6C17 6.55228 17.4477 7 18 7H20C20.5523 7 21 6.55228 21 6V4C21 3.44772 20.5523 3 20 3H18Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
}
