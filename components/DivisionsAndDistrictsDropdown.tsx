import AppColors from "@/constants/Colors";
import { districts, divisions } from "@/constants/DivisionsAndDistricts";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DivisionsAndDistrictsDropdown = ({
  setLocation,
}: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [divisionValue, setDivisionValue] = useState(null);
  const [divisionLabel, setDivisionLabel] = useState(null);
  const [districtValue, setDistrictValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [filteredDistrict, setFilteredDistrict] = useState([{}]);

  useEffect(() => {
    if (divisionValue) {
      const dis = districts.filter(
        (district: any) => district.divisionId === divisionValue
      );
      setFilteredDistrict(dis);
    }
  }, [divisionValue]);

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={divisions}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={divisionValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setDivisionValue(item.value);
          setIsFocus(false);
          setDivisionLabel(item.label);
        }}
      />
      {divisionValue && (
        <Dropdown
          style={[
            styles.dropdown,
            { marginTop: 10 },
            isFocus && { borderColor: "blue" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={filteredDistrict ? filteredDistrict : districts}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={districtValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setDistrictValue(item.value);
            setIsFocus(false);
            setLocation(`${item.label}, ${divisionLabel}`);
          }}
        />
      )}
    </View>
  );
};

export default DivisionsAndDistrictsDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
