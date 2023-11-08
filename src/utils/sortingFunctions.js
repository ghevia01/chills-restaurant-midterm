// Function to sort items by name
export const sortByName = (a, b) => {
    return a.name.localeCompare(b.name);
};

// Function to sort items by category
export const sortByIndex = (menuTabs) => (a, b) => {
    const indexA = menuTabs.indexOf(a.category);
    const indexB = menuTabs.indexOf(b.category);

    return indexA - indexB;
};