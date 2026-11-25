import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Screen from '../../src/components/layout/Screen';
import Card from '../../src/components/ui/Card';
import Button from '../../src/components/ui/Button';
import Input from '../../src/components/ui/Input';
import LeafMark from '../../src/components/ui/LeafMark';
import { colors, spacing, typography } from '../../src/theme';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice('');
  }

  function submit() {
    const next = {};
    if (!form.name.trim()) next.name = 'Tell us your name.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!EMAIL.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Create a password.';
    else if (form.password.length < 6) next.password = 'Use at least 6 characters.';
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.';

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setNotice(
        'This preview does not create an account yet. Supabase signup will be added in a later milestone.'
      );
    }
  }

  return (
    <Screen dark>
      <LinearGradient
        colors={[colors.forestDeep, colors.forest]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" style={styles.back}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </Pressable>
        <LeafMark size={44} />
      </View>

      <Text style={styles.title}>Create your space</Text>
      <Text style={styles.subtitle}>A calmer way to care for every leaf.</Text>

      <Card style={styles.formCard}>
        <Input
          label="Full name"
          icon="person-outline"
          value={form.name}
          onChangeText={(value) => update('name', value)}
          placeholder="Your name"
          autoCapitalize="words"
          error={errors.name}
        />
        <Input
          label="Email address"
          icon="mail-outline"
          value={form.email}
          onChangeText={(value) => update('email', value)}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoComplete="email"
          error={errors.email}
        />
        <Input
          label="Password"
          icon="lock-closed-outline"
          value={form.password}
          onChangeText={(value) => update('password', value)}
          placeholder="At least 6 characters"
          secureTextEntry
          autoComplete="new-password"
          error={errors.password}
        />
        <Input
          label="Confirm password"
          icon="checkmark-circle-outline"
          value={form.confirm}
          onChangeText={(value) => update('confirm', value)}
          placeholder="Repeat your password"
          secureTextEntry
          autoComplete="new-password"
          error={errors.confirm}
          onSubmitEditing={submit}
          returnKeyType="done"
        />

        {notice ? <Text style={styles.notice}>{notice}</Text> : null}

        <Button label="Create account" fullWidth onPress={submit} style={styles.submit} />
        <Button
          label="Explore the UI preview"
          variant="secondary"
          fullWidth
          onPress={() => router.replace('/home')}
          style={styles.preview}
        />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={styles.link}>Sign in</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  title: { ...typography.h1, color: colors.white },
  subtitle: { ...typography.body, color: '#A9BDB1', marginTop: 6, marginBottom: spacing.xl },
  formCard: { backgroundColor: colors.white, padding: spacing.lg },
  submit: { marginTop: spacing.sm },
  preview: { marginTop: spacing.md },
  notice: {
    ...typography.bodySmall,
    color: colors.forestMid,
    backgroundColor: '#EAF6D2',
    borderRadius: 14,
    padding: spacing.md,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  footerText: { ...typography.bodySmall, color: '#A9BDB1' },
  link: { ...typography.bodySmall, color: colors.lime },
});
