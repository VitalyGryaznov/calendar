import React from "react";
import { render, screen } from "@testing-library/react";
import ModalDialog from "./modalDialog";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import configureStore from "redux-mock-store";
import dayjs from "dayjs";

const mockStore = configureStore([]);
const component = (store: any) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <ModalDialog />
      </Provider>
    </QueryClientProvider>
  );
};
const modalDialogSelector = "modal-dialog";
const closeButtonSelector = "modal-dialog_close-button";
const deleteButtonSelector = "modal-dialog_delete-button";
const editButtonSelector = "modal-dialog_edit-button";
const reminderNameSelector = "modal-dialog_reminder-name";

describe("ModalDialog", () => {
  let store;
  let creatingNewReminderInitialState = {
    calendar: {
      selectedDay: dayjs(),
      selectedReminder: null,
      selectedMonth: 1,
      selectedYear: 2022,
      showReminderModal: true,
    },
  };
  let openExistingReminderInitialState = {
    calendar: {
      selectedDay: null,
      selectedReminder: {
        id: 1,
        name: "Another meeting",
        date: "2022-01-16",
      },
      selectedMonth: 1,
      selectedYear: 2022,
      showReminderModal: true,
    },
  };

  beforeEach(() => {});
  it("modal dialog is displayed when showReminderModal is true in the store", () => {
    store = mockStore(creatingNewReminderInitialState);
    render(component(store));
    expect(screen.getByTestId(modalDialogSelector)).toBeVisible();
    
  });
  it("modal dialog is not displayed when showReminderModal is false in the store", () => {
    const state = {calendar: {...creatingNewReminderInitialState.calendar, showReminderModal: false}};
    state.calendar.showReminderModal = false;
    store = mockStore(state);
    render(component(store));
    expect(screen.queryByTestId(modalDialogSelector)).not.toBeInTheDocument();
  });
  it("edit button is not dispalyed when modal is opened for creating a new reminder", () => {
    store = mockStore(creatingNewReminderInitialState);
    render(component(store));
    expect(screen.queryByTestId(editButtonSelector)).not.toBeInTheDocument();
  });
  it("delete button is not dispalyed when modal is opened for creating a new reminder", () => {
    store = mockStore(creatingNewReminderInitialState);
    render(component(store));
    expect(screen.queryByTestId(deleteButtonSelector)).not.toBeInTheDocument();
  });
  it("edit button is dispalyed when modal is opened for creating a new reminder", () => {
    store = mockStore(openExistingReminderInitialState);
    render(component(store));
    expect(screen.getByTestId(editButtonSelector)).toBeVisible();
  });
  it("delete button is dispalyed when modal is opened for creating a new reminder", () => {
    store = mockStore(openExistingReminderInitialState);
    render(component(store));
    expect(screen.getByTestId(deleteButtonSelector)).toBeVisible();
  });
  it("closeReminderModal reducer is dispatched on clicking close button", () => {
    store = mockStore(creatingNewReminderInitialState);
    render(component(store));
    screen.getByTestId(closeButtonSelector).click();
    expect(store.getActions()).toContainEqual({
      type: "calendar/closeReminderModal",
    });
  });
  it("closeReminderModal reducer is dispatched on clicking delete button", () => {
    store = mockStore(creatingNewReminderInitialState);
    render(component(store));
    screen.getByTestId(closeButtonSelector).click();
    expect(store.getActions()).toContainEqual({
      type: "calendar/closeReminderModal",
    });
  });
  it("correct reminder name is displayed in modal on onpening an existing reminder", () => {
    store = mockStore(openExistingReminderInitialState);
    render(component(store));
    expect(screen.getByTestId(reminderNameSelector)).toHaveTextContent(
      openExistingReminderInitialState.calendar.selectedReminder.name
    );
  });
});
