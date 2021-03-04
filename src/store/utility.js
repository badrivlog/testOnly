export const updatedObject = (updatedState, updatedProperties) => {
    console.log(updatedProperties, updatedState);
    return {
        ...updatedState,
        ...updatedProperties
    };
};