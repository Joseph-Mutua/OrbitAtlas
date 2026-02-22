import { describe, it, expect } from 'vitest';
import { formatNumber, formatCurrency, formatBytes } from './safeFormat';

describe('formatNumber', () => {
  it('formats integers', () => {
    expect(formatNumber(2200)).toBe('2,200');
  });
  it('returns — for null/undefined', () => {
    expect(formatNumber(null)).toBe('—');
    expect(formatNumber(undefined)).toBe('—');
  });
  it('returns — for NaN', () => {
    expect(formatNumber(NaN)).toBe('—');
  });
});

describe('formatCurrency', () => {
  it('formats USD', () => {
    expect(formatCurrency(385000)).toMatch(/\$385,000/);
  });
  it('returns — for null', () => {
    expect(formatCurrency(null)).toBe('—');
  });
});

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toMatch(/1\.0 KB/);
    expect(formatBytes(1024 * 1024)).toMatch(/1\.0 MB/);
  });
  it('returns — for invalid', () => {
    expect(formatBytes(null)).toBe('—');
    expect(formatBytes(-1)).toBe('—');
    expect(formatBytes(NaN)).toBe('—');
  });
});
