// ./screens/CategoryPickerView.js
import React from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { categoryStyle } from "../constants/constants";

const getButtonStyle = (isSelected) => [
  categoryStyle.category.content,
  isSelected && categoryStyle.category.selected.content,
];

const getTextStyle = (isSelected) => [
  categoryStyle.category.text,
  isSelected && categoryStyle.category.selected.text,
];

const CategoryPicker = ({ categories, selectedCategory, onCategoryPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={categoryStyle.container}
    >
      <View style={categoryStyle.category.container}>
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              onPress={() => onCategoryPress(category)}
              key={category}
              style={getButtonStyle(isSelected)}
            >
              <Text style={getTextStyle(isSelected)}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CategoryPicker;
