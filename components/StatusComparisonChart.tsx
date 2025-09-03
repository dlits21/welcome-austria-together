import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  translationNamespace: string;
}

export default function StatusComparisonChart({ translationNamespace }: Props) {
  const { t } = useTranslation(translationNamespace);

  const statuses = ["refugee", "subsidiary", "dublin", "rejected"];
  const rights = ["work", "housing", "healthcare", "family"];

  return (
    <View style={styles.chart}>
      <Text style={styles.title}>{t("comparison.title", { defaultValue: "Rights Comparison" })}</Text>

      {/* Header row */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerCell]}>{t("comparison.rights")}</Text>
        {statuses.map((s) => (
          <Text key={s} style={[styles.cell, styles.headerCell]}>
            {t(`status.${s}.short`)}
          </Text>
        ))}
      </View>

      {/* Rights rows */}
      {rights.map((r) => (
        <View key={r} style={styles.row}>
          <Text style={styles.cell}>{t(`rights.${r}`)}</Text>
          {statuses.map((s) => (
            <Text key={`${s}-${r}`} style={styles.cell}>
              {t(`status.${s}.rights.${r}`)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: { marginTop: 24, padding: 12, backgroundColor: "#f1f5f9", borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ddd", paddingVertical: 6 },
  header: { backgroundColor: "#e2e8f0" },
  cell: { flex: 1, fontSize: 14, textAlign: "center" },
  headerCell: { fontWeight: "700" }
});
