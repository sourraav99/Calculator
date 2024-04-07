import React, { useMemo, useState } from 'react';
import { View, Text, Dimensions, Switch, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const { height, width, fontScale } = Dimensions.get('window');
const scale = Dimensions.get('window').scale;

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState('')

  const colors = {
    dark: '#22252D',
    dark1: '#292B36',
    dark2: '#272B33',
    light: '#FFF',
    light1: 'rgb(220, 220, 220)',
    light2: '#F7F7F7',
  };
  const calculate = useMemo(() => {
    return (title) => {
      if (title === "C") {
        setResult('');
      } else if (title === "DL") {
        setResult(result.substring(0, result.length - 1));
      } else if (title === "=") {
        try {
          const ans = Number(eval(result).toFixed(3)).toString();
          setResult(ans);
        } catch (error) {
          setResult('Error');
        }
      } else {
        setResult(result + title);
      }
    };
  }, [result]);
  const Btn = ({ title, type }) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
        onPress={() => calculate(title)}
        style={[styles.keypadBtn, { backgroundColor: getColor(colors.light1, colors.dark1) }]}>
        <Text style={{
          fontSize: fontScale * 30, textAlign: 'center',
          textAlignVertical: 'center',
          color: getBtnColor(type)
        }}>{title}</Text>
      </TouchableOpacity>
    )
  }
  const getBtnColor = (type) => {
    if (type == "top") {
      return "#35FBD6"
    } else if (type == "right") {
      return "#EB6363"
    }
    return getColor(colors.dark, colors.light);
  }

  const getColor = (light, dark) => (darkTheme ? dark : light);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getColor(colors.light, colors.dark) }}>
      <View style={styles.mainView}>
        <Switch
          style={styles.switch}
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
          trackColor={{ true: colors.light2, false: colors.dark2 }}
          thumbColor={getColor(colors.dark, colors.light)}
        />
        <View style={styles.resultContainer}>
          <Text style={[styles.resultText, { color: getColor(colors.dark, colors.light) }]}>{result}</Text>
        </View>
        <View style={[
          styles.keypadContainer, { backgroundColor: getColor(colors.light, colors.dark1) }]}>
          <Btn title={"C"} type={"top"} />
          <Btn title={"DL"} type={"top"} />
          <Btn title={"/"} type={"top"} />
          <Btn title={"%"} type={"top"} />
          <Btn title={"7"} type={"number"} />
          <Btn title={"8"} type={"number"} />
          <Btn title={"9"} type={"number"} />
          <Btn title={"*"} type={"right"} />
          <Btn title={"4"} type={"number"} />
          <Btn title={"5"} type={"number"} />
          <Btn title={"6"} type={"number"} />
          <Btn title={"-"} type={"right"} />
          <Btn title={"3"} type={"number"} />
          <Btn title={"2"} type={"number"} />
          <Btn title={"1"} type={"number"} />
          <Btn title={"+"} type={"right"} />
          <Btn title={"00"} type={"number"} />
          <Btn title={"0"} type={"number"} />
          <Btn title={"."} type={"number"} />
          <Btn title={"="} type={"right"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  mainView: {
    flex: 1, alignItems: 'center', paddingVertical: scale * 5, justifyContent: 'space-evenly'
  },
  switch: {
    top: -40
  },
  resultContainer: {
    flex: 0.6, justifyContent: 'flex-end'
  },
  resultText: {
    width: width, fontSize: fontScale * 35, textAlign: 'right', paddingRight: scale * 10,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  keypadBtn: {
    height: height * 0.075,
    width: height * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  }
})