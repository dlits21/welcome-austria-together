import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  translationNamespace: string;
}

export default function StatusQuizBox({ translationNamespace }: Props) {
  const { t } = useTranslation(translationNamespace);
  const [selected, setSelected] = useState<string | null>(null);

  const statuses = ["refugee", "subsidiary", "dublin", "rejected"];

  return (
    <View style={styles.box}>
      <Text style={styles.title}>{t("quiz.title", { defaultValue: "Which status do I have?" })}</Text>

      {/* Quiz buttons */}
      <View style={styles.options}>
        {statuses.map((s) => (
          <Pressable
            key={s}
            style={[styles.option, selected === s && styles.optionSelected]}
            onPress={() => setSelected(s)}
          >
            <Text style={styles.optionText}>{t(`status.${s}.title`)}</Text>
          </Pressable>
        ))}
      </View>

      {/* Status details */}
      {selected && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>{t(`status.${selected}.title`)}</Text>
          <Text style={styles.detailsText}>{t(`status.${selected}.desc`)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginVertical: 16, padding: 16, backgroundColor: "#f9fafb", borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", margin: 4 },
  optionSelected: { backgroundColor: "#e0f2fe", borderColor: "#3b82f6" },
  optionText: { fontSize: 15 },
  details: { marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: "#fff8dc" },
  detailsTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  detailsText: { fontSize: 14, color: "#444" },
});